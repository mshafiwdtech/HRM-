import moment from "moment";


export let ConvertDateToLocal = (para_date) => {

    var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


    let date = new Date(para_date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return dt + '/' + month + '/' + year
}

export let ConvertDateToLocal_YYMMDD = (para_date) => {

    var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


    let date = new Date(para_date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return year + '-' + month + '-' + dt
}



export const getDashboardCountsFromFilterData = (para_data, period) => {

    let periods = ["year", "month", "week", "yesterday", "today"]
    let obj =
    {
        _total:0,
        _new: 0,
        _hot: 0,
        _siteVisited: 0,
        _sale: 0
    }


    let checkFlags = {
        new: "New",//stage
        hot: "Hot",//stage
        siteVisited: "Site Visited",//status*
        sale: "Sale"//stage
    }



    let isThisWeek = (para_date) => {

        var now = moment();
        var input = moment(para_date);
        var isThisWeek = (now.isoWeek() == input.isoWeek())

        return isThisWeek

    }

    let isYesterDay=(para_date)=>{

        const result = moment(para_date).isSame(moment().subtract(1, 'day'), "day")

        return result
    }


    let isToday=(para_date)=>{
        
        const result = moment(para_date).isSame(moment().subtract(0, 'day'), "day")

        return result
    }

  

    if (para_data!==null) {

       

        if (period === periods[0]) {

            obj =
            {
                _total:para_data.filter(element => new Date(element.createdAt).getFullYear() === new Date().getFullYear()).length,
                _new: para_data.filter(element => element.stage?.name === checkFlags.new && new Date(element.createdAt).getFullYear() === new Date().getFullYear()).length,
                _hot: para_data.filter(element => element.stage?.name === checkFlags.hot && new Date(element.createdAt).getFullYear() === new Date().getFullYear()).length,
                _siteVisited: para_data.filter(element => element.status?.name === checkFlags.siteVisited && new Date(element.createdAt).getFullYear() === new Date().getFullYear()).length,
                _sale: para_data.filter(element => element.stage?.name === checkFlags.sale && new Date(element.createdAt).getFullYear() === new Date().getFullYear()).length,
            }
        }

        else if (period === periods[1]) {

            obj =
            {
                _total:para_data.filter(element => new Date(element.createdAt).getMonth() === new Date().getMonth()).length,
                _new: para_data.filter(element => element.stage?.name === checkFlags.new && new Date(element.createdAt).getMonth() === new Date().getMonth()).length,
                _hot: para_data.filter(element => element.stage?.name === checkFlags.hot && new Date(element.createdAt).getMonth() === new Date().getMonth()).length,
                _siteVisited: para_data.filter(element => element.status?.name === checkFlags.siteVisited && new Date(element.createdAt).getMonth() === new Date().getMonth()).length,
                _sale: para_data.filter(element => element.stage?.name === checkFlags.sale && new Date(element.createdAt).getMonth() === new Date().getMonth()).length,
            }
        }

        else if (period === periods[2]) {

            obj =
            {
                _total:para_data.filter(element => isThisWeek(element.createdAt)).length,
                _new: para_data.filter(element => element.stage?.name === checkFlags.new && isThisWeek(element.createdAt)).length,
                _hot: para_data.filter(element => element.stage?.name === checkFlags.hot && isThisWeek(element.createdAt)).length,
                _siteVisited: para_data.filter(element => element.status?.name === checkFlags.siteVisited && isThisWeek(element.createdAt)).length,
                _sale: para_data.filter(element => element.stage?.name === checkFlags.sale && isThisWeek(element.createdAt)).length,
            }
        }

        else if (period === periods[3]) {

            obj =
            {
                _total: para_data.filter(element => isYesterDay(element.createdAt)).length,
                _new: para_data.filter(element => element.stage?.name === checkFlags.new && isYesterDay(element.createdAt)).length,
                _hot: para_data.filter(element => element.stage?.name === checkFlags.hot && isYesterDay(element.createdAt)).length,
                _siteVisited: para_data.filter(element => element.status?.name === checkFlags.siteVisited && isYesterDay(element.createdAt)).length,
                _sale: para_data.filter(element => element.stage?.name === checkFlags.sale && isYesterDay(element.createdAt)).length,
            }
        }

        else if (period === periods[4]) {

            obj =
            {
                _total: para_data.filter(element => isToday(element.createdAt)).length,
                _new: para_data.filter(element => element.stage?.name === checkFlags.new && isToday(element.createdAt)).length,
                _hot: para_data.filter(element => element.stage?.name === checkFlags.hot && isToday(element.createdAt)).length,
                _siteVisited: para_data.filter(element => element.status?.name === checkFlags.siteVisited && isToday(element.createdAt)).length,
                _sale: para_data.filter(element => element.stage?.name === checkFlags.sale && isToday(element.createdAt)).length,
            }
        }

        else {

            obj =
            {
                _total: para_data.length,
                _new: para_data.filter(element => element.stage?.name === checkFlags.new).length,
                _hot: para_data.filter(element => element.stage?.name === checkFlags.hot).length,
                _siteVisited: para_data.filter(element => element?.status.name === checkFlags.siteVisited).length,
                _sale: para_data.filter(element => element.stage?.name === checkFlags.sale).length,
            }


        }


    }

    return obj



}


export const HELPER_validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };




  export const createRowPerPageOptionArray=(para_max)=>{

    if(para_max<=10)
    {
        return [10]
    }

    else if(para_max<=20)
    {
        return [10,para_max]
    }

    else if(para_max<=30)
    {
        return [10,20,para_max]
    }
    else{

        return [10,20,30]

    }

  }