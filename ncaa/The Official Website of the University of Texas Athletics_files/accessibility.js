/**
 *
 * Prevent browser from scrolling back to the upcoming games list
 * when the hidden "skip to navagation" link has been clicked.
 *
 * Screen readers (especially JAWS) have a hard time not getting
 * into a loop without this.
 *
 * @param {Object} options - selectors/hashes for: navigation and header
 *
 */

var accessibilty_debug = true;

$.fn.AccessibleScrollLock = function (options) {

    //Prepend this string to all console.log output
    var preConsoleLog = "AccessibleScrollLock >>> ";

    if (window.accessibilty_debug) { console.log(preConsoleLog + "Initializing: " + this.selector); }

    var defaults = {
        navigation: "#main-navigation",
        header: "#main-header"
    };

    options = $.extend(defaults, options);

    function scrollLock() {

        if (location.hash === options.navigation) {

            var $navigation = $(options.navigation);

            if ($(window).scrollTop() < $navigation.offset().top) {

                $("html,body").scrollTop($navigation.offset().top);

                //$("html,body").scrollTop($navigation.offset().top + 5); // scroll just past the navigation block start

                //$navigation.focus();

            }

        }

    }

    $(window).scroll(function () {

        scrollLock();

    });

    scrollLock();

    /*
    if (location.hash === "" || location.hash === "#") {
        $("html,body").scrollTop(0);
        $("#sidearm-head-skip-links").focus();
        console.log(preConsoleLog + "?");
    } else {
        scrollLock();
    }
    */

};//$.fn.AccessibleScrollLock


/**
 *
 * Intercept the event where the user clicks on a hidden skip link
 *
 * @param {Object} options - selectors/hashes for: scorecard, navigation, and content
 *
 */
$.fn.AccessibleSkipLinks = function (options) {

    //Prepend this string to all console.log output
    var preConsoleLog = "AccessibleSkipLinks >>> ";

    if (window.accessibilty_debug) { console.log(preConsoleLog + "Initializing: " + this.selector); }

    var defaults = {
        scorecard: "#main-scorecard",
        navigation: "#main-navigation",
        content: "#main-content",
        linkLevel1: ".c-navigation__url--level-1"
    };

    options = $.extend(defaults, options);

    this.click(function (e) {

        if (window.accessibilty_debug) { console.log(preConsoleLog + "skip link clicked"); }

        var $this = $(this),
            hash = $(this).attr("href");

        this.blur();

        location.hash = "";

        // Manually control the "skip to navigation" link (set location hash and scroll the page)
        if (hash === options.navigation) {

            if (window.accessibilty_debug) { console.log(preConsoleLog + "skip to nav clicked"); }

            e.preventDefault(); // prevent the default behaviour

            var $navigation = $(options.navigation);

            location.hash = options.navigation;

            $("html,body").scrollTop($navigation.offset().top + 5); // scroll just past the navigation block start



            setTimeout(function () { $navigation.find(options.linkLevel1).first().focus(); }, 10);

        }

    });


};//$.fn.AccessibleSkipLinks


/**
 *
 * Control the event where the user tabs in and out of a menu link
 *
 * @param {Object} options - selectors for: parentLevel1, column, linkLevel1, linkLevel2, and search
 *
 */
$.fn.AccessibleMenuLinks = function (options) {

    //Prepend this string to all console.log output
    var preConsoleLog = "AccessibleMenuLinks >>> ";

    if (window.accessibilty_debug) { console.log(preConsoleLog + "Initializing: " + this.selector); }

    if (typeof window.prevKey === "undefined") {

        console.log(preConsoleLog + "Defining window.prevKey");

        window.prevKey = {};

    }

    //Set globals
    //window.prevKey = -1;
    window.prevKey[this.selector] = -1;
    window.shiftKey = false;

    //Set default options
    var defaults = {
        menubar: ".main-navigation-menubar",
        parentLevel1: ".main-navigation-level-1-item",
        column: ".main-navigation-level-2-column",
        linkLevel1: ".main-navigation-level-1-link",
        linkLevel2: ".main-navigation-level-2-link",
        subLevel2: ".main-navigation-level-2-sub",
        sponser: ".main-navigation-sponser",
        search: "#search-input",
        skip: ".sidearm-skip-link",
        content: "#main-content"
    };

    //Overwrite the default options with any specified at time of initiation.
    options = $.extend(defaults, options);

    if (window.accessibilty_debug) { console.log(preConsoleLog + "options = ", options); }


    /**
     * Normalize hrefs, classes, tabindexes, roles, and aria attributes
     *
     */
    /*
    //Menubar
    $(options.menubar).attr("role", "menubar");

    //Level 1 parents
    $(options.parentLevel1).attr("aria-expanded", "false");

    //Level 1 links
    $(options.linkLevel1).each(function (index, element) {

        var $linkLevel1 = $(this);

        if ((typeof $linkLevel1.attr("href") !== typeof undefined && $linkLevel1.attr("href") !== false) || $linkLevel1.attr("href") === "") {
            //Default for level 1 links that are dropdowns
            $linkLevel1
                .attr("href", "javascript:void(0)")
                .attr("tabindex", "0")
                .attr("aria-haspopup", "true")
                .attr("aria-expanded", "false")
                .attr("role", "menu")
                .addClass("haspopup");
        } else {
            //Default for level 1 links that are actually a link
            $linkLevel1
                .attr("tabindex", "0")
                .attr("aria-haspopup", "false");
        }

    });

    //Level 2 links
    $(options.linkLevel2)
        .attr("tabindex", "-1")
        .attr("role", "menuitem");

    //Sponser links
    $(options.sponser).attr("role", "none");
    $(options.sponser + " a").attr("tabindex", "-1");
    */

    /**
     * Resets the debounce variable (long key press)
     *
     * Note: Since we are listening to the keydown event we want to ensure that
     *       prolonged keypresses do not behave like a rapid keyup event.
     *
     */
    $(this).on("keyup", options.linkLevel1 + ", " + options.linkLevel2, function (e) {

        var key = e.which,
            listening = [
                9,  //TAB
                13, //RETURN/ENTER
                27, //ESC
                32, //SPACE
                33, //PAGEUP
                34, //PAGEDOWN
                35, //END
                36, //HOME
                37, //LEFT
                38, //UP
                39, //RIGHT
                40  //DOWN
            ];

        if (listening.indexOf(key) > -1) {
            window.prevKey = -1;
        }

    });//"keyup", options.linkLevel1, options.linkLevel2


    /**
     * Shift Key Handler
     *
     * Listens for and records the state of the shift key
     */
    $(document).on("keydown", function (e) {

        if (e.which === 16) {
            window.shiftKey = true;
        }

    }).on("keyup", function (e) {

        if (e.which === 16) {
            window.shiftKey = false;
        }

    });//"keydown" (shift key handler)


    /**
     * Level 1 Link Keyboard Logic
     *
     * Note: Keydown was the most reliable way of catching enter/return
     */
    $(this).on("keydown", options.linkLevel1, function (e) {

        var $this = $(this),
            $parent = $this.closest(options.parentLevel1),
            //$parent = $this.parent(),
            key = e.which,
            listening = [
                9,  //TAB
                13, //RETURN/ENTER
                27, //ESC
                32, //SPACE
                33, //PAGEUP
                34, //PAGEDOWN
                35, //END
                36, //HOME
                37, //LEFT
                38, //UP
                39, //RIGHT
                40  //DOWN
            ];

        if (window.accessibilty_debug) { console.log(preConsoleLog + "keydown: " + key); }

        if (listening.indexOf(key) > -1) {

            e.preventDefault();

        }

        //LEFT or SHIFT TAB
        if (key === 37 || (key === 9 && window.shiftKey)) {

            //debounce
            if (window.prevKey !== 37 && window.prevKey !== 9) {

                window.prevKey = key;

                if (window.accessibilty_debug) { console.log(preConsoleLog + "LEFT or SHIFT TAB was pressed"); }

                var $prev = $parent.prev().find(options.linkLevel1);

                if ($prev.length) {

                    if (window.accessibilty_debug) { console.log(preConsoleLog + "previous linkLevel1: " + $prev.text()); }

                    $prev.focus();

                } else {

                    if (window.accessibilty_debug) { console.log(preConsoleLog + "end of linkLevel1: proceeding to skip links"); }

                    $parent.closest(options.skip).focus();

                }

            }

            //RIGHT or TAB
        } else if (key === 39 || key === 9) {

            //debounce
            if (window.prevKey !== 39 && window.prevKey !== 9) {

                window.prevKey = key;

                if (window.accessibilty_debug) { console.log(preConsoleLog + "RIGHT or TAB was pressed"); }

                if ($parent.hasClass("open")) {

                    console.log(preConsoleLog + "menu is open");

                    $parent.find(options.linkLevel2).first().focus();

                } else {

                    var $next = $parent.next().find(options.linkLevel1).first();

                    //console.log(preConsoleLog +  $parent.text() );

                    if ($next.length) {

                        if (window.accessibilty_debug) { console.log(preConsoleLog + "next linkLevel1: " + $next.text()); }

                        $next.focus();

                    } else {

                        if (window.accessibilty_debug) { console.log(preConsoleLog + "end of linkLevel1: proceeding to search input"); }

                        //$(options.search).first().focus();
                        $(options.search).focus();

                    }

                }

            }

            //ENTER, DOWN, or SPACE
        } else if (key === 13 || key === 40 || key === 32) {

            e.preventDefault();

            //debounce
            if (window.prevKey !== 13 && window.prevKey !== 40 && window.prevKey !== 32) {

                window.prevKey = key;

                if (window.accessibilty_debug) { console.log(preConsoleLog + "ENTER or DOWN was pressed"); }

                if ($this.hasClass("haspopup")) {

                    openMenu($this);

                } else {

                    window.location = $this.attr("href");

                }

            }

        }

    });//"keydown", options.linkLevel1


    /**
     * Level 2 Link Keyboard Logic
     *
     * Note: Keydown was the most reliable way of catching enter/return
     */
    $(this).on("keydown", options.linkLevel2, function (e) {

        var $this = $(this),
            $parent = $this.closest(options.parentLevel1),
            key = e.which,
            listening = [
                9,  //TAB
                13, //RETURN/ENTER
                27, //ESC
                32, //SPACE
                33, //PAGEUP
                34, //PAGEDOWN
                35, //END
                36, //HOME
                37, //LEFT
                38, //UP
                39, //RIGHT
                40  //DOWN
            ];

        if (window.accessibilty_debug) { console.log(preConsoleLog + "keydown: " + key); }

        //Prevent the default browser behavour for key presses we are listening to
        if (listening.indexOf(key) > -1) {

            e.preventDefault();

        }

        //LEFT, UP, or SHIFT TAB
        if (key === 37 || key === 38 || (key === 9 && window.shiftKey)) {

            //debounce
            if (window.prevKey !== 37 && window.prevKey !== 38 && window.prevKey !== 9) {

                window.prevKey = key;

                if (window.accessibilty_debug) { console.log(preConsoleLog + "LEFT, UP, or SHIFT TAB was pressed"); }

                var $prev = $this.prevAll(options.linkLevel2 + '[tabindex="0"]').first(),
                    $prevParent = $this.parent();

                if ($prev.length) {

                    if (window.accessibilty_debug) { console.log(preConsoleLog + "previous linkLevel2: " + $prev.text()); }

                    $prev.focus();

                } else {

                    if ($prevParent.hasClass(options.subLevel2.replace(".", ""))) {

                        if (window.accessibilty_debug) { console.log(preConsoleLog + "end of subLevel2: proceeding to parent link"); }

                        $prev = $prevParent.parent().find(options.linkLevel2 + '[tabindex="0"]').first();

                    } else {

                        if (window.accessibilty_debug) { console.log(preConsoleLog + "end of linkLevel2: proceeding to prev li"); }

                        $prev = $this.parent().prev("li").find(options.linkLevel2 + '[tabindex="0"]').last();

                    }

                    if ($prev.length) {

                        $prev.focus();

                    } else {

                        if (window.accessibilty_debug) { console.log(preConsoleLog + "end of column: proceeding to prev column"); }

                        $prev = $this.parent().parent().prev("ul").find(options.linkLevel2 + '[tabindex="0"]').last();

                        if (window.accessibilty_debug) { console.log(preConsoleLog + "previous column linkLevel2: " + $prev.text()); }

                        if ($prev.length) {

                            $prev.focus();

                        } else {

                            if (window.accessibilty_debug) { console.log(preConsoleLog + "end of menu: proceeding BACK to menu bar"); }

                            $prev = $parent.find(options.linkLevel1).first();

                            if (window.accessibilty_debug) { console.log(preConsoleLog + "parent menu item: " + $prev.text()); }

                            closeMenu();

                            $prev.focus();

                        }

                    }

                }

            }

            //RIGHT, TAB, DOWN
        } else if (key === 39 || key === 9 || key === 40) {

            //debounce
            if (window.prevKey !== 39 && window.prevKey !== 9 && window.prevKey !== 40) {

                var $next = $this.nextAll(options.linkLevel2 + '[tabindex="0"]').first(),
                    $nextParent = $this.parent();

                if (window.accessibilty_debug) { console.log($this.next(options.linkLevel2 + '[tabindex="0"]')); }

                if ($next.length) {

                    if (window.accessibilty_debug) { console.log(preConsoleLog + "next linkLevel2:", $next.text()); }

                    $next.focus();

                } else {

                    //check for links inside a sub div
                    $next = $this.parent().find(options.subLevel2 + " " + options.linkLevel2 + '[tabindex="0"]').first();

                    if ($next.length) {

                        if (window.accessibilty_debug) { console.log(preConsoleLog + "next subLevel2 link: ", $next.text()); }

                        $next.focus();

                    } else {

                        if (window.accessibilty_debug) { console.log(preConsoleLog + "end of linkLevel2: proceeding to next li"); }

                        if ($nextParent.hasClass(options.subLevel2.replace(".", ""))) {

                            $next = $nextParent.parent().next("li").find(options.linkLevel2).first();

                        } else {

                            $next = $this.parent().next("li").find(options.linkLevel2).first();

                        }

                        if ($next.length) {

                            $next.focus();

                        } else {

                            if (window.accessibilty_debug) { console.log(preConsoleLog + "end of column: proceeding to next column"); }

                            if ($nextParent.hasClass(options.subLevel2.replace(".", ""))) {

                                $next = $nextParent.parent().parent().next("ul").find(options.linkLevel2).first();

                            } else {

                                $next = $this.parent().parent().next("ul").find(options.linkLevel2).first();

                            }

                            if ($next.length) {

                                $next.focus();

                            } else {

                                if (window.accessibilty_debug) { console.log(preConsoleLog + "end of menu: proceeding to next menu"); }

                                $next = $parent.next(options.parentLevel1).find(options.linkLevel1);

                                openMenu($next);

                            }

                        }

                    }

                }

            }

            //ENTER or SPACE
        } else if (key === 13 || key === 32) {

            //debounce
            if (window.prevKey !== 13 && window.prevKey !== 32) {

                window.prevKey = key;

                if (window.accessibilty_debug) { console.log(preConsoleLog + "ENTER or SPACE was pressed"); }

                if (window.accessibilty_debug) { console.log(preConsoleLog + $this.attr("href")); }

                window.location = $this.attr("href");

            }

        }

    });//"keydown", options.linkLevel2


    /**
     * Escape closes the current menu
     */
    $(this).on("keyup", options.linkLevel2, function (e) {

        var $this = $(this),
            $parent = $this.closest(options.parentLevel1),
            key = e.which;

        //ESC
        if (key === 27) {

            closeMenu();

            $parent.find(options.linkLevel1).first().focus();

        }


    });//"keyup", options.linkLevel2


    //JMORGAN: Not sure it is wise to mess with the keyboard behavour while inside the search box...
    /**
     * Search box Keyboard Logic
     *
     * Note: Keydown was the most reliable way of catching enter/return
     */
    /*
    $(this).on("keydown", options.search, function (e) {

        var $this = $(this),
            $parent = $this.closest(options.parentLevel1),
            //$parent = $this.parent(),
            key = e.which,
            listening = [
                9,  //TAB
                //13, //RETURN/ENTER
                //27, //ESC
                //32, //SPACE
                //33, //PAGEUP
                //34, //PAGEDOWN
                //35, //END
                //36, //HOME
                37, //LEFT
                38, //UP
                39, //RIGHT
                40  //DOWN
            ];

        console.log(preConsoleLog + "keydown: " + key);

        if (listening.indexOf(key) > -1) {

            e.preventDefault();

        }

        //LEFT or SHIFT TAB
        if (key === 37 || (key === 9 && window.shiftKey)) {

            //debounce
            if (window.prevKey !== 37 && window.prevKey !== 9) {

                window.prevKey = key;

                console.log(preConsoleLog + "LEFT or SHIFT TAB was pressed");

                var $prev = $parent.prev().find(options.linkLevel1);

                if ($prev.length) {

                    console.log(preConsoleLog + "previous linkLevel1: " + $prev.text());

                    $prev.focus();

                } else {

                    console.log(preConsoleLog + "end of linkLevel1: proceeding to skip links");

                    $parent.closest(options.skip).focus();

                }

            }

        //RIGHT or TAB
        } else if (key === 39 || key === 9) {

            //debounce
            if (window.prevKey !== 39 && window.prevKey !== 9) {

                window.prevKey = key;

                console.log(preConsoleLog + "RIGHT or TAB was pressed");

            }


    });//"keydown", options.search
    */


    /**
     * Opens a menu and sets the focus to its first link
     *
     * @param {Object} $this - jQuery object of element to be opened
     *
     */
    function openMenu($this) {

        if (window.accessibilty_debug) { console.log(preConsoleLog + "openMenu(): " + $this.text()); }

        //var $parent = $this.parent();
        var $parent = $this.closest(options.parentLevel1);

        //Close any open menus
        closeMenu();

        //Set targeted classes, arias, and tabindexes to the open/expanded state
        $this.attr("aria-expanded", "true");
        $parent.addClass("open");
        $parent.find(options.linkLevel2 + "[aria-hidden='true']").attr("tabindex", "-1").addClass("aria-hidden");
        $parent.find(options.column).attr("aria-expanded", "true");

        //$parent.find(options.linkLevel2).filter(":visible").attr("tabindex", "0");
        //The filter above wasn't working 100% of the time so we are being a little more explicit by looking at the css settings
        $parent.find(options.linkLevel2).each(function (index, element) {

            if ($(this).css("visibility") !== "hidden" && $(this).css("visibility") !== "none" && $(this).css("display") !== "none" && $(this).is(":visible") && !$(this).hasClass("aria-hidden")) {
                $(this).attr("tabindex", "0");
            } else {
                $(this).attr("tabindex", "-1");
            }

        });

        //Set the focus to the first level 2 link in the opened menu
        $parent.find(options.linkLevel2).first().focus();

    }//openMenu()


    /**
     * Resets the menubar's state to closed
     */
    function closeMenu() {

        if (window.accessibilty_debug) { console.log(preConsoleLog + "closeMenu()"); }

        //Reset classes, arias, and tabindexes
        $(options.parentLevel1).removeClass("open");
        $(options.linkLevel2).attr("tabindex", "-1");
        $(options.linkLevel1).attr("aria-expanded", "false");
        $(options.column).attr("aria-expanded", "false");

    }//closeMenu();


    /**
     * Ensure that all menus are closed when focus is on the level 1 links
     */
    $(this).on("click", options.linkLevel1, function (e) {

        var $this = $(this),
            //$parent = $this.parent();
            $parent = $this.closest(options.parentLevel1);

        if ($this.hasClass('haspopup')) {

            if ($parent.hasClass('open')) {

                closeMenu();

            } else {

                openMenu($this);

            }

        }

    });//"click", options.linkLevel1


    /**
     * Ensure that all menus are closed when focus is on the level 1 links
     */
    $(this).on('focusin', options.linkLevel1, function (e) {

        //var $this = $(this),
        //    $parent = $this.closest(options.parentLevel1);

        closeMenu();

    });


};//$.fn.AccessibleMenuLinks


/**
 *
 * Clear the focus outline on mouseup
 *
 * Keeps the interface less cluttered for sighted users while still giving
 * accessible affordances to keyboard navigating users.
 *
 * @param {Object} options - selectors list
 *
 */
$.fn.AccessibleClearFocusOutline = function (options) {

    if ("selectors" in options) {

        for (i = 0; i < options.selectors.length; i++) {

            $(document).on("mouseup", options.selectors[i], function (e) {
                $(this).blur();
            });

        }

    }

};