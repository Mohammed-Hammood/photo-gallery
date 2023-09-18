import { useState, useEffect } from 'react'
import {  useAppDispatch } from 'store/hooks';
import { setErrors } from 'store/slicers/errors';
import { MethodTypes} from "libs/types";

interface InitialRequest {
    method: MethodTypes;
    headers: {
        [key: string]: string
    },
    body?: any
}
 
type Props = {
    callback?: ({ data, method, url }: any ) => void;
    url?: string | null;
    showMessage?: boolean;
    condition?: ((res: any) => boolean) | boolean; 
    headers?: any;
    loading?: boolean;
    method?:MethodTypes;
};
export function useFetch(props: Props) {
    const [loading, setLoading] = useState<boolean>(props.loading !== undefined ? props.loading : false);
    const [callback, setCallback] = useState<((value:any)=> void) | null >(()=> props.callback || null );
    const [message, setMessage] = useState<null | { status: number, message: string }>(null)
    const [method, setMethod] = useState<MethodTypes>(props.method || "GET");
    const [data, setData] = useState<any>(null);
    const [url, setUrl] = useState<string | null | undefined>(props.url);
    const [showMessage, setShowMessage] = useState<boolean>(props.showMessage !== undefined ? props.showMessage : true);
    const dispatch = useAppDispatch();
    const condition = (res: any): boolean => {
        if (props.condition && typeof props.condition !== 'boolean') return props.condition(res);
        else if (props.condition && typeof props.condition === 'boolean') return props.condition;
        return false;
    }
    useEffect(() => {
        const headers = props.headers || { 'Content-Type': 'application/json',};
        const options: InitialRequest = {
            headers: headers,
            method: method
        }
        if (data && ['POST', 'PUT', 'DELETE'].includes(method)) options.body = JSON.stringify(data);

        const sendRequest = async (url: string): Promise<void> => {
            try {
                const req = await fetch(url, options);
                if (req.status !== 200) {
                    throw { status: req.status, statusText: req.statusText, type: req.type, ok: req.ok }
                }
                const res = await req.json();
                if ((res && res.status === 200) || condition(res)) {
                    if(callback)callback({ data: res, method, url });
                }
                else {
                    setMessage({ status: res.status, message: res.message })
                }
            } catch (err: any) {
                const errors = {status:err.status, statusText:err.statusText, type:err.type, ok: err.ok};
                dispatch(setErrors({ errors: errors, showMessage: showMessage }))
                setMessage({ status: err.status, message: err.message });
            } finally {
                setLoading(false);
                setUrl(null);
            }
        }
        if (url && !loading) {
            setLoading(true);
            setMessage(null);
            sendRequest(url);
        }
    }, [dispatch,  url, loading, data, message, showMessage, method, condition, props.headers, setUrl, setMethod, setLoading, props])
    return {
        loading,
        message,
        method,
        url,
        setUrl,
        setMessage,
        setData,
        setMethod,
        setLoading,
        setShowMessage,
        setCallback,
    }
}