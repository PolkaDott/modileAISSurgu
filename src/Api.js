import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

//const SupportMail = "2kr@scud86.ru";

class Api{
    static BaseUrl = 'http://192.168.43.210:5000/';
    static ErrorText = 'Попробуйте перезайти в приложение или убедиться в том, что имеется доступ в интернет. Если ошибка все равно появляется, напишите нам LinuxCloudSupport@gmail.com'
    static imageUri = Api.BaseUrl+'media/';
    static ApiVersion = 'v1';
    static defaultHeaders = {        
        'Api-Version' : Api.ApiVersion,
    };
    static jsonHeaders = {
        ...Api.defaultHeaders,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    static CustomFetch(path, options={}){
        //if (!options.headers)
        //    options.headers = Api.defaultHeaders;
        console.log('Итоговый запрос:', Api.BaseUrl+path);
        return fetch(Api.BaseUrl+path, options);
    }


    /*static async CustomFetchAdapter(path, setData, func){
        let options = {
        }
        let response;
        try{
            response = await Api.CustomFetch(path, options);
        }
        catch(e){
            console.log('FETCH ERROR: ', e);
            Alert.alert('Ошибка', 'Попробуйте перезайти в приложение или убедиться в том, что имеется доступ в интернет. Если ошибка все равно появляется, напишите нам LinuxCloudSupport@gmail.com')
            setData('ERR');
            return;
        }
        let result;
        try{
            result = await response.json();
        }
        catch(e){
            console.log('FETCH CRITICAL ERROR: ', e);
            console.log(response);
            Alert.alert('Ошибка', 'Ошибка на сервере. Попробуйте позже или обратитесь в техподдержку: ' + SupportMail)
            setData('ERR');
            return;
        }
        if (func){
            result = func(result);
        }
        setData(result);
        return result;

    }*/

    static async Auth(username, password){
        let options = {
            method: 'POST',
        }
        let response;
        try{
            let query = 'Auth/api?login='+username+'&password='+password;
            //console.log('query',query);
            response = await Api.CustomFetch(query, options);
        }
        catch(e){
            console.log('FETCH ERROR: ', e);
            Alert.alert('Ошибка1', Api.ErrorText)
            return;
        }
        if (response.status==204){
            return false;
        }
        else if (response.status == 200){
            return true;
        }
        let result;
        try{
            result = await response.json();
            console.log('OCHKO', result);
        }
        catch(e){
            console.log('FETCH CRITICAL ERROR: ', e);
            console.log(response);
            Alert.alert('Ошибка2', Api.ErrorText)
            return;
        }
    }

    static async GetBills(id, setData){
        let options = {
        }
        let response;
        try{
            let query = 'Bill/api/'+id;
            //console.log('query',query);
            response = await Api.CustomFetch(query, options);
        }
        catch(e){
            console.log('FETCH ERROR: ', e);
            Alert.alert('Ошибка1', Api.ErrorText)
            return;
        }
        /*if (response.status==204){
            return false;
        }
        else if (response.status == 200){
            return true;
        }*/
        let result;
        try{
            let list = []
            //console.log('response', response);
            result = await response.json();
            console.log('OCHKO', result);
        }
        catch(e){
            console.log('FETCH CRITICAL ERROR: ', e);
            console.log(response);
            Alert.alert('Ошибка2', Api.ErrorText);
            return;
        }
        setData(result);
    }

    static async SendBill(id, type, date, company, cost, comment, link='https://s00.yaplakal.com/pics/pics_preview/5/7/5/15122575.jpg' ){
        let options = {
            method: 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    "id": 0,
                    "date": date,
                    "name": company,
                    "type": {
                        "id": type,
                        "name": "1"
                    },
                    "status": {
                        "id": 1,
                        "status": "1"
                    },
                    "user": {
                        "id": id,
                        "mail": "1",
                        "role": {
                        "id": 1,
                        "name": "1"
                        },
                        "username": "1",
                        "passhash": "1",
                        "limitRefundMoney": 0
                    },
                    "link":link,
                    "comment":comment,
                    "frequency": {
                        "id": 1,
                        "name": "1"
                    },
                    "endDate": null,
                    "amount": cost
            })
        }
        console.log(options.body)
        let response;
        try{
            let query = 'Bill/api/';
            response = await Api.CustomFetch(query, options);
        }
        catch(e){
            console.log('FETCH ERROR: ', e);
            Alert.alert('Ошибка1', Api.ErrorText)
            return;
        }
        console.log('resp', response)
    }









    static CheckPhone = async (phone) => {
        let options = {
            method: 'POST',
            headers: this.jsonHeaders,
            body: JSON.stringify({
                phone: phone,
            })
        }
        return Api.CustomFetch('checkphone/', options);
    }

    static SendToken = async (token, phone) => {
        let options = {
            method: 'POST',
            headers: this.jsonHeaders,
            body: JSON.stringify({
                token : token,
                phone: phone,
                platform: 'android',
            })
        };
        return Api.CustomFetch('addtoken/', options);
    }

    static GetProducts = async (setData) => {
        let response = await Api.CustomFetch('products/');
        let json = await response.json();
        var jsonFiltered = json.filter((item) => item.rest != 0);
        setData(jsonFiltered);
    };

    static GetProductImage(name){
        return {uri : Api.imageUri + name}
    }


    static SendJson = async (path, setData, json, func) => {
        let options = {
            method: 'POST',
            headers: this.jsonHeaders,
            body: JSON.stringify(json),
        }
        let response;
        try{
            response = await Api.CustomFetch(path, options);
        }
        catch(e){
            console.log('FETCH ERROR: ', e);
            Alert.alert('Ошибка', 'Попробуйте перезайти в приложение или убедиться в том, что имеется доступ в интернет. Если ошибка все равно появляется, напишите нам ' + SupportMail)
            setData('ERR');
            return;
        }
        if (response.status == 204){
            setData([]);
            return;
        }
        else if (response.status == 426){
            Alert.alert('Необходимо обновление приложения', 'Эта версия приложения устарела. Пожалуйста, обновите его в Play Market')
            setData('ERR');
            return;
        }
        else if (response.status == 409){
            let message = await response.json();
            Alert.alert('Внимание', message);
            return;
        }
        else if (response.stauts == 500){
            console.log('FETCH CRITICAL ERROR: ', e);
            console.log(response);
            Alert.alert('Ошибка', 'Ошибка на сервере. Попробуйте позже или обратитесь в техподдержку: ' + SupportMail)
            setData('ERR');
            return;
        }
        let result;
        try{
            result = await response.json();
        }
        catch(e){
            console.log('FETCH CRITICAL ERROR: ', e);
            console.log(response);
            Alert.alert('Ошибка', 'Ошибка на сервере. Попробуйте позже или обратитесь в техподдержку: ' + SupportMail)
            setData('ERR');
            return;
        }
        if (func){
            result = func(result);
        }
        setData(result);
        return result;
    }

    static GetStudents = async (setData) => {
        const phone = await AsyncStorage.getItem('PhoneNumber');
        Api.SendJson(
            path='students/',
            setData=setData,
            json={phone: phone},
        )
    }

    static GetTransactions = async (setData, tabid) => {
        Api.SendJson(
            path='transactions/',
            setData=setData,
            json={sigur_tabid: tabid},
            func=(result)=>{
                return result.map((i)=>{
                    i.date = new Date(i.date);
                    i.date.setHours(i.date.getHours() - 5); // в react native нет setLocaleString
                    return i;
                });
            })
    }

    static GetMessages = async (setData) => {
        const phone = await AsyncStorage.getItem('PhoneNumber');
        Api.SendJson(
            path='messages/',
            setData=setData,
            json={phone: phone},
            func=(result)=>{
                return result.map((i)=>{
                    i.date = new Date(i.date);
                    i.date.setHours(i.date.getHours() - 5); // в react native нет setLocaleString
                    return i;
                });
            })
    }

    static GetPasses = async (setData) => {
        const phone = await AsyncStorage.getItem('PhoneNumber');
        Api.SendJson(
            path='passes/',
            setData=setData,
            json={phone: phone},
            func=(result)=>{
                return result.map((i)=>{
                    i.date = new Date(i.date);
                    i.date.setHours(i.date.getHours() - 5); // в react native нет setLocaleString
                    return i;
                });
            })
    }

    static MakeCardPayment = async (setData, info) =>{
        const phone = await AsyncStorage.getItem('PhoneNumber');
        info.phone = phone;
        Api.SendJson(
            path='cardpayment/',
            setData=setData,
            json=info,
            )
    }

    static UpdateStudent = async (data) =>{
        const phone = await AsyncStorage.getItem('PhoneNumber');
        data.phone = phone;
        return Api.SendJson(
            path='updatestudent/',
            setData=() => 1,
            json=data,
            )
    }
}

export {Api};