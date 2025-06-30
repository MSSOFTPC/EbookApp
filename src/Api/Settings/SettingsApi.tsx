import BaseApi from '../BaseApi'

// Get
const SettingsGet = async({})=>{
    return await BaseApi.get(`settings/`);
}


export {SettingsGet}