export const REGEX = {
    VALIDATE_ID: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,12}$/,
    // eslint-disable-next-line no-useless-escape
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    PHONE: /[0-9]/,
    NAME: /[a-zA-Z0-9가-힣ㄱ-ㅎ]$/,
    NAME_ADDRESS: /[a-zA-Z0-9가-힣ㄱ-ㅎ,-.]$/,
    UNIT_ADDRESS: /[a-zA-Z0-9가-힣ㄱ-ㅎ`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]$/, //eslint-disable-line
    NAME_ENGLISH: /[a-zA-Z0-9]$/,
    CHECK_SPACE: /^[^\s]+$/,
    // PASSWORD:
    //   /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])([a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,16})/,
    VALIDATE_EMAIL_K: /(\S[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]+\S)/, // check email korea
    VALIDATE_EMAIL:
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
    VALIDATE_NAME_QUESTION: /^[\u3131-\uD79D]+[0-9]+[a-zA-Z!@#$%^&*(),.?":{}|<>]{1,10}$/,
    // eslint-disable-next-line no-useless-escape
    VALIDATE_NAME: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]+/,
    SPECIAL_CHARS: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, //eslint-disable-line
    VIETNAMESE:
      /[^ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
    ALLOW_FILES: /\.(pdf|jpg|jpeg|png|heif|heic|zip)$/,
    ALLOW_IMAGES: /\.(jpg|jpeg|png|heif|heic)$/,
    ALLOW_EMAIL_CHANGE_REPORT: /^[a-zA-Z0-9!@#$%^&*)(+=._-]+$/,
    APPLE_FILES: /\.(heif|heic)$/,
    COMPRESSED_FILES: /\.(zip)$/,
    DATE: /(\d{4})(\d{2})(\d{2})/,
  };
  