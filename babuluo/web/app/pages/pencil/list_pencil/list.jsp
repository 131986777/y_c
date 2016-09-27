<!DOCTYPE html>
<html lang="zh-CN" ng-app="list">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head 
         content must come *after* these tags -->
    
    <title>list</title>

    <link href="list.css" rel="stylesheet">

    <jsp:include page="/app/components/commonCss.jsp"/>
</head>

<body>

    <div ui-view="nav"></div>
    
    <div class="container" ng-controller="ListController">
        <div class="row row-content">
            <div class="col-sm-12">
            	<table class="table table-bordered table-hover table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>State</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="item in list">
                        <td>{{item.NAME}}</td>
                        <td>{{item.PSTATE}}</td>
                        <td>
                            <a class="table-link" 
                                data-toggle="modal" data-target="#edit"
                                ng-click="edit(item)">
                                Edit
                            </a>
                            <a class="table-link">
                                Delete
                            </a>
                        </td>
                    </tr>
                </tbody>   
                </table>

                <!-- BEGIN edit modal -->
                <div class="modal fade" id="edit" role="dialog" aria-labelledby="edit">
                    <div class="modal-dialog" aria-hidden="true">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button class="close" type="button" data-dismiss="modal" 
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>       
                                </button>
                                <h3 class="modal-title">
                                    Edit
                                </h3>
                            </div>
                            <div class="modal-body">
                                <form class="form-horizontal" name="editForm" 
                                    ng-submit="saveChange()" novalidate>
                                    <div class="form-group" 
                                    ng-class="{'has-error' : editForm.NAME.$error.required && !editForm.NAME.$pristine}">
                                        <label class="col-sm-2 control-label" >
                                            Name
                                        </label>
                                        <div class="col-sm-10">
                                            <input class="form-control" type="text" 
                                                name="name" ng-model="itemEdited.NAME" required>
                                            <span class="help-block" ng-show="editForm.NAME.$error.required && !editForm.NAME.$pristine">
                                                Name is required!
                                            </span>
                                        </div>
                                    </div>

                                    <div class="form-group" 
                                    ng-class="{'has-error' : editForm.PSTATE.$error.required && !editForm.PSTATE.$pristine}">
                                        <label class="col-sm-2 control-label" >
                                            Type
                                        </label>
                                        <div class="col-sm-10">
                                            <input class="form-control" type="text" 
                                                name="type" ng-model="itemEdited.PSTATE" required>
                                            <span class="help-block" ng-show="editForm.PSTATE.$error.required && !editForm.PSTATE.$pristine">
                                                Type is required!
                                            </span>
                                        </div>
                                    </div>

                                    <div class="modal-footer">
                                        <button class="btn btn-primary" type="submit"
                                            disabled="editForm.$invalid">
                                            Save
                                        </button>
                                        <button class="btn btn-default"
                                            data-dismiss="modal">
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END edit modal -->
            </div>     
        </div>
    </div>

    <div ui-view="footer"></div>
     

    <jsp:include page="/app/components/commonJs.jsp"/>

    <script src="list.js"></script>
    <script src="../pencil-services.js"></script>
    <script src="list-controllers.js"></script>
    <!-- endbuild -->

</body>
</html>