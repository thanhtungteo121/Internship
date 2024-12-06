export const isJsonString =(data)=>{
    try{
        JSON.parse(data)
    }catch(e){
        return false;
    }
    return true;
}

export const convertPrice = (price)=>{
    try {
        const result = price?.toLocaleString().replaceAll(',',',');
        return `${result} VNĐ`
    } catch (error) {
        return null
    }
}
