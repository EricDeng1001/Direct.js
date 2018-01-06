const requireModel = ( model ) => require('../Models/' + model );

requireModel('userAuth');
requireModel('userInfo');
requireModel('userLog');
requireModel('message');
