import No_Preview_available from "../assets/images/No_preview_available.jpg";
import moment from "moment";

export const onImageError = (event) => {
    if(event && event.currentTarget) {
        event.currentTarget.src = No_Preview_available;
    }
}

export const isEmptyArray = (data) => {
    return !(data && Array.isArray(data) && data.length > 0);
}

export const formatDateTime = (dateTime) => {
    try {
        return moment(dateTime).format("MMM DD, YYYY")
    }
    catch(ex) {}
} 