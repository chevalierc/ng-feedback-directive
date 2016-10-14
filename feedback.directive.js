var scripts = document.getElementsByTagName( "script" )
var currentScriptPath = scripts[ scripts.length - 1 ].src;

angular.module( 'feedbackDirective', [] )

.directive( 'feedback', function ( feedbackService ) {
    return {
        templateUrl: currentScriptPath.replace( 'js', 'html' ), //killer
        scope: {
            route: '=',
            message: '@'
        },
        transclude: true,
        link: function ( scope, element, attrs ) {
            scope.response = ""
            scope.show_dialog = false

            scope.toggle = function () {
                scope.show_dialog = !scope.show_dialog
            }

            scope.submit = function () {
                scope.loading = true
                feedbackService.submit( scope.route, scope.response ).then( function ( res ) {
                    scope.loading = false
                    scope.show_dialog = false;
                } )
            }

        }
    };
} )

.factory( 'feedbackService', function ( $http ) {
    var feedbackService = {};

    feedbackService.submit = function ( path, {
        response: response
    } ) {
        return $http.post( path, response );
    };

    return feedbackService;
} )
