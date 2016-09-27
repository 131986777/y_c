angular.module('treeList', [])
    .directive('treeList', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                treeData: '=',
                selectedItem: '=',
                edit: '&',
                delete: '&'
            },
            link: function(scope) {
                /**
                 * 菜单初始化，子菜单默认隐藏。
                 *
                 * @param {object} menu 当前菜单。
                 */
                scope.menuInit = function(menu) {
                    if (menu.childList) {
                        menu.showSubmenu = false; // 子菜单默认隐藏
                    }
                };

                /**
                 * 子菜单的展开和关闭功能。
                 *
                 * @param {object} menu 当前菜单。
                 */
                scope.toggleMenu = function(menu) {
                    /**
                     * 阻止事件冒泡。
                     *
                     * @param {object} e 被阻止的事件。
                     */
                    function stopBubble(e) {
                        if (e && e.stopPropagation) { // 非IE
                            e.stopPropagation();
                        }
                        else { // IE
                            window.event.cancelBubble = true;
                        }
                    }

                    menu.showSubmenu = !menu.showSubmenu;
                    stopBubble(event);
                };

                /**
                 * 根据菜单是否有子菜单以及子菜单的状态来用来设置图标的样式。
                 *
                 * @param {object} menu 当前菜单。
                 * @returns {string} 图标的样式。
                 */
                scope.setIconAngleStyle = function(menu) {
                    var iconStyle = '';

                    if (!menu.childList) return;

                    if (menu.showSubmenu === false) {
                        iconStyle = 'fa-angle-down';

                        return iconStyle;
                    } else {
                        iconStyle = 'fa-angle-up';

                        return iconStyle;
                    }
                };

                /**
                 * 下拉菜单的选择功能。
                 *
                 * @param {object} menu 当前菜单。
                 */
                scope.selectItem = function(menu) {
                    scope.selectedItem = menu.name;
                };
            },
            templateUrl: function(elem, attr) {
                return "../../components/tree-list/tree-" + attr.type + ".html";
            }
        }
    });
