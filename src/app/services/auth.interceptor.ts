import { HttpInterceptorFn } from "@angular/common/http";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token'); 

    console.log(req);

    if (token) {
        req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
    }

    return next(req);
}