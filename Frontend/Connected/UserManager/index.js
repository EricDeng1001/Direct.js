import view from 'layout';
import * as actions from 'actions';
import reducer from 'reducer';

let useridRegExp = /^\w*$/;
let passwordRegExp = /^[\w!@*]*([!@*]|[A-Z])+[\w!@*]*([!@*]|[A-Z])+[\w!@*]*$/;

export { view , actions , reducer , useridRegExp , passwordRegExp };
