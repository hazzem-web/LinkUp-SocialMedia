
interface AError{
    status: number,
    message: string,
    cause?: unknown
}

export class ApplicationError extends Error implements AError { 
    constructor(message: string , public status: number , cause?: unknown) { 
        super(message , {cause});
        this.name = this.constructor.name;
    }
} 




export class BadRequestException extends ApplicationError {
    constructor(message:string , cause?:unknown){
        super(message , 400 , { cause })
    }
};


export class conflictException extends ApplicationError { 
    constructor(message:string , cause?:unknown){
        super(message , 409 , { cause })
    }
};


export class NotFoundException extends ApplicationError { 
    constructor(message:string , cause?:unknown){
        super(message , 404 , { cause })
    }
};



export class UnAuthorizedException extends ApplicationError { 
    constructor(message:string , cause?:unknown){
        super(message , 401 , { cause })
    }
};



export class ForbiddenException extends ApplicationError { 
    constructor(message:string , cause?:unknown){
        super(message , 403 , { cause })
    }
};





