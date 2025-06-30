import BaseApi from '../BaseApi'

// POST
export interface MembershipRequestType{
    paymentIntent:{
        method:String,
        qrimage:String,
    },
    payment:Number,
    plantype:"sixmonth"|"yearly"|"monthly",
    duration:Number // 180 days
}

const MembershipRequest = async({paymentIntent,payment,plantype,duration}:MembershipRequestType)=>{
    return await BaseApi.post(`user/membership/purchase`,{paymentIntent,payment,plantype,duration});
}

// Get
const BookGetAll = async({query})=>{
    return await BaseApi.get(`book?${query}`);
}


export {MembershipRequest,BookGetAll}