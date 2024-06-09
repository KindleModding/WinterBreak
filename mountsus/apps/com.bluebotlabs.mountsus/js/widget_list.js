/*
 * widget_list.js
 *
 * Copyright (c) 2012-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * PROPRIETARY/CONFIDENTIAL
 *
 * Use is subject to license terms.
 */

const GROW_LEFT_FIRST = 1;
const GROW_RIGHT_FIRST = 2;

/**
 * @function setDialogPosition  Set the position of a dialog on-screen
 * @param dialogElem         (HTMLElement) The dialog's DOM node
 * @param screenCenter  ({x: Number, y: Number}) The position of the top-center pixel of the dialog
 * @param growth             The direction to grow first (either GROW_LEFT_FIRST or GROW_RIGHT_FIRST)
 * @param screenMargin       (Number) The margin to keep between the dialog and the screen edge
 *                           the dialog grows toward
 *
 * This function would make more sense as a method of Pillow.MenuCase, but it's also needed by
 * Pillow.SearchDomain. When Pillow.SearchDomain is adapted to be a subclass of Pillow.MenuCase, this
 * function can be moved.
 */
var setDialogPosition = function(dialogElem, screenCenter, growth, screenMargin) {
    /**
     * Note: the variable names here assume that the dialog grows to the left. If the dialog grows to
     * the right, references to "right" and "left" are generally swapped.
     */
    var width = dialogElem.offsetWidth;
    var orientation = nativeBridge.getOrientation();
    var screenWidth = nativeBridge.devcapGetInt(DEVCAP_SCREEN,
            orientation === 'L' || orientation === 'R' ?
            DEVCAP_PROPERTY_RESOLUTION_HEIGHT :
            DEVCAP_PROPERTY_RESOLUTION_WIDTH);
    /**
     * Step 1. Assume that we can fit everything to the left.
     */
    var widthRight = 0;
    var widthLeft = width;
    /**
     * Step 2. Find out how much of the left side has overflowed the left edge of the screen.
     */
    var distFromLeft =
        growth === GROW_LEFT_FIRST ?
        screenCenter.x :
        screenWidth - screenCenter.x;
    var leftOverflow = Math.max(0, widthLeft + screenMargin - distFromLeft);
    /**
     * Step 3. Shift to the right by the overflow amount.
     */
    widthRight += leftOverflow;
    widthLeft -= leftOverflow;
    /**
     * Step 4. If we are now overflowing to the right, shrink the dialog width to fit.
     */
    var rightOverflow =
        Math.max(0, distFromLeft + widthRight + screenMargin - screenWidth);
    width -= rightOverflow;
    widthRight -= rightOverflow;
    dialogElem.style.width = width + 'px';
    /**
     * Step 5. Find our screen coordinates.
     */
    var dialogLeftSideDistFromLeft = distFromLeft - widthLeft;
    var screenX =
        growth === GROW_LEFT_FIRST ?
        dialogLeftSideDistFromLeft :
        screenWidth - dialogLeftSideDistFromLeft - width;
    var screenY = screenCenter.y;
    /**
     * Step 6. Tell X where to put the window.
     */
    nativeBridge.setWindowPosition(screenX, screenY);
};

/**
 * A widget that displays a list of items that can be tapped.
 *
 * @param elemId       The container element in which to build the list
 * @param userOptions  An object that provides optional, named parameters (see below)
 *
 * The container element should have a child with two classes, "item" and "template".
 * This is the "template element". The widget will copy the entire template for each
 * list item displayed, and then fill in the copy.
 *
 * The template is filled in using "fields". The fields to fill are listed in
 * the "fields" parameter. Each field to fill must be the name of a property in
 * each item object; the value stored in that property is what will be copied
 * into the template. The template, in turn, must have a child element with two
 * classes. One class is the field's name; the other is the field's type.
 *
 * There are two supported field types:
 *
 * 1. text-field: the text content of the field will be replaced with the field value
 * 2. class-field: the class of the field will be set to the field value
 *                 (plus its two existing classes)
 * 3. text-replace-field: the matched text will be applied a class that is specified
 */
var ListWidget = function(elemId, userOptions) {

    const DEFAULT_OPTIONS = {
        // Field names
        fields: [],
        // Items to display when the list is created
        initialItems: [],
        // Callback for when an item is tapped
        handler: function(item) { },
        // If true, items are visually inverted when tapped
        xor: true,
        // If non-null, only this many items are displayed, at most
        initialMaxVisibleItems: null,
        // Initial index of the first visible item
        initialScrollOffset: 0,
        // If true, a scrollbar is displayed as needed
        showScrollBar: false,
        // A uniquely-identifying key found in each item object
        identifierKey: 'id',
        // The below fields are used only with text-replace-field. 
        // matchStr        - provides the field that is searched for in the field. 
        // replaceStr      - the string to be replaced for the matchStr. 
        // replaceClass    - the class that is applied to this matched text alone.
        // skipMatchFields - the list of fields to skip matching.
        // truncateMatchStr- this specifies that the string matched should be truncated with ellipsis
        //                   if the scrollWidth of the entire field exceeds the clientWidth
        matchStr: undefined,
        replaceStr: undefined,
        replaceClass: undefined,
        skipMatchFields: undefined,
        truncateMatchStr: false
    };

    var options;
    var maxVisibleItems;
    var items;
    var itemElems;
    var sepElems;
    var listElem;
    var itemTemplateElem;
    var itemTemplate;
    var scrollOffset;
    var scrollBarWidget;
    var disabled;
    var containerElem;

    var init = function() {
        options = {};
        for (var i in DEFAULT_OPTIONS) {
            if (userOptions.hasOwnProperty(i)) {
                options[i] = userOptions[i];
            } else {
                options[i] = DEFAULT_OPTIONS[i];
            }
        }

        maxVisibleItems = options.initialMaxVisibleItems;
        items = [];
        itemElems = [];
        sepElems = [];
        scrollOffset = options.initialScrollOffset;
        disabled = false;

        containerElem = document.getElementById(elemId);
        if (!containerElem) {
            Pillow.logWarn('widget-list-invalid-list-id', {id: elemId});
            return;
        }

        listElem = document.createElement('div');
        listElem.setAttribute('class', 'items');
        containerElem.appendChild(listElem);

        if (options.showScrollBar && maxVisibleItems != null) {
            scrollBarWidget = new ScrollBar(containerElem);
        }

        itemTemplateElem = containerElem.querySelector('.template.item');
        itemTemplate = itemTemplateElem.innerHTML;
        if (!itemTemplate) {
            Pillow.logWarn('widget-list-no-template', {id: elemId});
        }

        this.setItems(options.initialItems);
    };

    var sendVisualChangeEvent = function() {
        if (containerElem && containerElem.onvisualchange) {
            Pillow.logInfo('pillow-list-send-visual-change-event');
            containerElem.onvisualchange();
        }
    };

    var forEachVisibleItem = function(f) {
        var numVisibleElements = 0;
        for (var i = 0; i < itemElems.length; ++i) {
            f(items[i + scrollOffset], itemElems[i], sepElems[i]);
            if(!Pillow.hasClass(itemElems[i], 'empty')) {
                numVisibleElements++;
            }
        }
        containerElem.setAttribute('aria-setsize', numVisibleElements);
    };

    var shouldItemBeDisabled = function(item) {
        return disabled ? true : (item.disabled ? true : false);
    };

    var renderItemInSlot = function(item, elem, sep) {
        elem.innerHTML = itemTemplate;
        if (item) {
            elem.meaning = item[options.identifierKey];
            elem.disabled = shouldItemBeDisabled(item);
            for (var j in options.fields) {
                var fieldName = options.fields[j];
                var field = elem.querySelector('.' + fieldName);
                if (field && item.hasOwnProperty(fieldName)) {
                    var fieldClass = field.getAttribute('class');
                    var fieldValue = item[fieldName];
                    if (fieldClass.match(/\btext-field\b/)) {
                        field.textContent = fieldValue ? fieldValue : '';
                        if( field.textContent == '') {
                            field.style.display = 'none';
                        }
                    } else if (fieldClass.match(/\bhtml-field\b/)) {
                        field.innerHTML = fieldValue ? fieldValue : '';
                        if( field.innerHTML == '') {
                            field.style.display = 'none';
                        }
                    } else if (fieldClass.match(/\btext-replace-field\b/)) {
                        var matchStr = item[options.matchStr];
                        var skipField = item[options.skipMatchFields];
                        if (matchStr && skipField !== fieldName) {
                            var matchElement, newSpanElement;
                            var regexp = new RegExp(Pillow.escapeRegExp(matchStr), 'ig');
                            var matchLen = matchStr.length;
                            var textLen = fieldValue.length;
                            var pos = 0;
                            var i = 0;
                            while (pos != -1) {
                                pos = fieldValue.substring(i).search(regexp);
                                if (pos !== -1) {
                                    newSpanElement = document.createElement('span');
                                    newSpanElement.textContent = fieldValue.substring(i, i + pos);
                                    
                                    matchElement = document.createElement('span');
                                    var replaceStr = item[options.replaceStr];
                                    if(replaceStr) {
                                        matchElement.textContent = replaceStr;
                                    } else {
                                        matchElement.textContent = fieldValue.substring(i + pos, i + pos + matchLen);
                                    }
                                    Pillow.addClass(matchElement, options.replaceClass);

                                    field.appendChild(newSpanElement);
                                    field.appendChild(matchElement);
                                    i += pos + matchLen ;
                                }
                            }
                            if (i < textLen) {
                                var newSpanElement = document.createElement('span');
                                newSpanElement.textContent = fieldValue.substring(i, textLen);
                                field.appendChild(newSpanElement);
                            }
                            //Truncate the matchStr alone if the entire field "overflows"
                            //We assume here that the last found matchElement should be truncated,
                            //but this is alright, as the current consumer of this approach is the
                            //moreResults widget in search results and there will be only one match.
                            if (options.truncateMatchStr) {
                                if (field.clientWidth < field.scrollWidth) {
                                    var originalText = matchElement.textContent;
                                    //We now have the string that caused the overflow
                                    var fullLength = originalText.length;
                                    var charactersCut = 0;
                                    //Now, we remove characters one by one from the end and append ellipsis
                                    //and check whether we are able to fit the entire field without overflow.
                                    do {
                                        charactersCut++;
                                        var newText = originalText.substring(0, fullLength - 1 - charactersCut);
                                        newText += "...";
                                        matchElement.textContent = newText;
                                    } while (field.clientWidth < field.scrollWidth && charactersCut < fullLength);
                                }
                            }
                        } else {
                            field.textContent = fieldValue ? fieldValue : '';
                        }

                        if( field.innerHTML == '') {
                            field.style.display = 'none';
                        }
                    } else if (fieldClass.match(/\bclass-field\b/)) {
                        field.setAttribute('class',
                                'class-field ' + fieldName +
                                (fieldValue ? ' ' + fieldValue : ''));
                        field.setAttribute('documentType', item.type);
                    } else {
                        Pillow.logWarn('widget-list-invalid-field', {field: j});
                    }
                } else {
                    Pillow.logWarn('widget-list-missing-field', {field: j});
                    if (field) {
                        var fieldClass = field.getAttribute('class');
                        if (fieldClass && fieldClass.match(/\btext-field\b/)) {
                            field.style.display = 'none';
                        }
                    }
                }
            }
            elem.setAttribute('class', 'item');
            if (sep) {
                sep.style.display = '';
            }
        } else {
            elem.disabled = true;
            elem.setAttribute('class', 'item empty');
            if (sep) {
                sep.style.display = 'none';
            }
        }
    };

    var updateItemContents = function() {
        // set the button contents
        forEachVisibleItem(renderItemInSlot);

        // update the scroll bar
        if (scrollBarWidget) {
            scrollBarWidget.setScrollbar(
                    items.length, maxVisibleItems, Math.floor(scrollOffset / maxVisibleItems));
        }

        sendVisualChangeEvent();
    };

    this.setMaxVisibleItems = function(n) {
        if (n <= 0) {
            Pillow.logError('pillow-list-max-vis', {n: n});
            return;
        }
        maxVisibleItems = n;
        this.setItems(items);
    };

    this.renderItem = function(item) {
        if (item && item.hasOwnProperty('position') &&
                item.position >= 0 && item.position <= items.length) {
            // store the item in the array
            items[item.position] = item;
            // if this position is within the scroll window, re-render it
            if (item.position >= scrollOffset && item.position < scrollOffset + itemElems.length) {
                var elemPos = item.position - scrollOffset;
                renderItemInSlot(item, itemElems[elemPos], sepElems[elemPos]);
            }
        }
        sendVisualChangeEvent();
    };

    this.setItems = function(arg, params) {
        // record the new data
        items = arg;
        
        // make sure we have the right number of buttons
        var itemsToDisplay = items.length;
        var moreResults = 0;
        for(i=0; i<itemElems.length; i++)
        {
            if(itemElems[i])
            {
                var singleLabel = itemElems[i].querySelector('.singlelabel');
                if( singleLabel && singleLabel.textContent && singleLabel.textContent != "")
                {
                    moreResults++;
                }
            }
        }
        if(moreResults)
        {
            containerElem.setAttribute('aria-setsize', moreResults);
        }
        
        if (maxVisibleItems != null) {
            itemsToDisplay = Math.min(itemsToDisplay, maxVisibleItems);
        }
        if (itemElems.length < itemsToDisplay) {
            // not enough buttons
            for (var i = itemElems.length; i < itemsToDisplay; ++i) {
                (function(i) {
                     var elem = document.createElement('button');
                     elem.setAttribute('class', 'item');
                     var handler = function() {
                        options.handler(items[i + scrollOffset]);
                     };
                     if (options.xor && items[i + scrollOffset].xor !== false) {
                        new XorButton(elem, handler, elem, 'item', 'item xor');
                     } else {
                        elem.addEventListener('click', handler);
                     }
                     itemElems.push(elem);
                     // TODO Check if need to remove the separator logic.
                     sepElems.push(null);
                     listElem.appendChild(elem);
                })(i);
            }
        } else if (itemElems.length > itemsToDisplay) {
            // too many buttons
            for (var i = itemsToDisplay; i < itemElems.length; ++i) {
                if (sepElems[i]) {
                    listElem.removeChild(sepElems[i]);
                }
                listElem.removeChild(itemElems[i]);
            }
            itemElems.splice(itemsToDisplay);
            sepElems.splice(itemsToDisplay);
        }

        // If our scroll position is past the last item, scroll up.
        // This can happen when the number of items shrinks.
        while (scrollOffset > 0 && scrollOffset >= items.length) {
            scrollOffset -= maxVisibleItems;
        }
        // If maxVisibleItems has been increased, scrolling back "one page"
        // could result in a negative offset, so correct it here.
        if (scrollOffset < 0) {
            scrollOffset = 0;
        }

        if(params && params.resetPos) {
            // Explicitly asks scroll to be placed at top of list
            scrollOffset = 0;
        }

        updateItemContents();

        var actualNo = 0;
        for(i=0; i<itemElems.length; i++)
        {
            if(itemElems[i])
            {
                var label = itemElems[i].querySelector('.label');
                if(label && label.textContent && label.textContent != "")
                {
                    actualNo++;
                }
            }
        }
        if(actualNo)
        {
            containerElem.setAttribute('aria-setsize', (maxVisibleItems != null && maxVisibleItems < actualNo) ? maxVisibleItems : actualNo);
        }
    };
    
    this.setProperListWidgetSize = function(domains) {
        var maxLength = 0;
        var elem = [];
        
        // Loop through and find the domain with the maximum string length.
        for (var i in domains) {
            var item = domains[i];
            if (item.description.length > maxLength) {
                elem[0] = item;
                maxLength = item.description.length;
            }
        }
        // compute the width for this maximum length string and set it as width.
        this.setItems(elem);
        return (containerElem.offsetWidth + Math.round(containerElem.offsetWidth * 0.1)) + "px";
    };

    this.scrollDown = function(by) {
        if (disabled) {
            Pillow.logDbgHigh('widget_list not scrolling while disabled');
            return;
        }
        if (scrollOffset + itemElems.length >= items.length) {
            // nothing to reveal by scrolling down
            return;
        }
        if (by == null) {
            // default amount to scroll is one page
            by = maxVisibleItems;
        }
        if (by == null) {
            Pillow.logWarn('pillow-list-cannot-scroll', {dir: 'down'});
            return;
        }
        var old = scrollOffset;
        scrollOffset += by;
        if (scrollOffset >= items.length) {
            // always show at least one item
            scrollOffset = items.length - 1;
        }
        if (scrollOffset != old) {
            updateItemContents();
        }
    };

    this.scrollUp = function(by) {
        if (disabled) {
            Pillow.logDbgHigh('widget_list not scrolling while disabled');
            return;
        }
        if (scrollOffset == 0) {
            // nothing to reveal by scrolling up
            return;
        }
        if (by == null) {
            // default amount to scroll is one page
            by = maxVisibleItems;
        }
        if (by == null) {
            Pillow.logWarn('pillow-list-cannot-scroll', {dir: 'down'});
            return;
        }
        var old = scrollOffset;
        scrollOffset -= by;
        if (scrollOffset < 0) {
            scrollOffset = 0;
        }
        if (scrollOffset != old) {
            updateItemContents();
        }
    };

    this.setScrollOffset = function(off) {
        if (disabled) {
            Pillow.logDbgHigh('widget_list not scrolling while disabled');
            return;
        }
        if (off == null) {
            Pillow.logWarn('pillow-list-cannot-scroll', {dir: 'none'});
            return;
        }
        if (off != scrollOffset) {
            scrollOffset = off;
            updateItemContents();
        }
    };

    this.clear = function() {
        items = [];
        for (var i = 0; i < itemElems.length; ++i) {
            if (sepElems[i]) {
                listElem.removeChild(sepElems[i]);
            }
            listElem.removeChild(itemElems[i]);
        }
        itemElems = [];
        sepElems = [];
        sendVisualChangeEvent();
    };

    this.setDisabled = function(newValue) {
        if (disabled === newValue) {
            return;
        }
        disabled = newValue;
        if (disabled) {
            Pillow.addClass(listElem, 'disabled');
        } else {
            Pillow.removeClass(listElem, 'disabled');
        }
        forEachVisibleItem(function(item, elem) {
            if (item) {
                elem.disabled = shouldItemBeDisabled(item);
            }
        });
    };

    init.call(this);

};

