const __certificationRegex__ = /^\w{7,12}$/;
const __passwordRegex__ = /^[\w!@*]*([!@*]|[A-Z])+[\w!@*]*([!@*]|[A-Z])+[\w!@*]*$/;

module.exports = {
  __certificationRegex__,
  __testCertification__( text ){
    return __certificationRegex__.test( text );
  },
  __passwordRegex__,
  __testPassword__( text ){
    return __passwordRegex__.test( text );
  }
};
