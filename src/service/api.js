const api_url = process.env.NEXT_PUBLIC_API_URL;
export const get_data = async () => {
    try {
        const response = await fetch(`${api_url}/products`, {
            method: "GET"
        })
        const data = await  response.json();
    } catch (error) {
        console.log(err)
    }
};
export const post_data = async (data) => {
    try {
        const response = await fetch(`${api_url}/products`, {
            method: "POST"
        })  
    } catch (error) {
        
    }
};
export const remove_data = async () =>{
 
}
export const edit_data = async () ={

}
