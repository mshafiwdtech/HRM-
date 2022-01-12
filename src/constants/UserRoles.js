let userTypes = [
    "Super Admin", //0
    "Admin",       //1
    "Sales Lead",  //2
    "Pre Sale Manager", //3
    "Pre Sale Executive", //4
    "Sales Manager",      //5
    "Sales Executive"      //6
]


export const tableColumNames = ["firstName",//...........................0
    "createdAt",//...........................1
    "updated_date_string",//...........................2
    "email",//...........................3
    "phone",//...........................4
    "Presale_executive",//...........................5
    "Sales_executive",//...........................6
    "next_contact_date_moment",//...........................7
    "lead_stage",//...........................8
    "lead_status",//...........................9
    "project",//...........................10
    "channel",//...........................11
    "medium",//...........................12
    "source",//...........................13
    "subsource",//...........................14
    "ampaign_name",//...........................15
    "campaign_term",//...........................16
    "campaign_content",//...........................17
]



export const getLeadsTableRestrictionData = (para_users) => {

    let userData = JSON.parse(localStorage.getItem('epitomeUser'))
    let para_user = userData?.role

    if (para_user === userTypes[0]) {
        return ["flag"]
    }

    else if (para_user === userTypes[1]) {
        return [
            "flag",
            "campaign_content"
        ]
    }
    else if (para_user === userTypes[2]) {
        return [
            "flag",
            "campaign_content"
        ]
    }

    else if (para_user === userTypes[3]) {
        return [
            "flag",
            "Sales_executive",
            "subsource",
            "ampaign_name",
            "campaign_term",
            "campaign_content"
        ]
    }

    else if (para_user === userTypes[4]) {
        return [
            "flag",
            "Presale_executive",
            "Sales_executive",
            "subsource",
            "ampaign_name",
            "campaign_term",
            "campaign_content"

        ]
    }

    else if (para_user === userTypes[5]) {
        return [
            "flag",
            "Presale_executive",
            "subsource",
            "ampaign_name",
            "campaign_term",
            "campaign_content"
        ]
    }

    else if (para_user === userTypes[6]) {
        return [
            "flag",
            "Presale_executive",
            "Sales_executive",
            "subsource",
            "ampaign_name",
            "campaign_term",
            "campaign_content"
        ]
    }
    else {

        return [
            "flag",
            "campaign_content"
        ]

    }

}



export const filterOptionNames = [
    "Status",//….................0	
    "Location",//….................1	
    "Project",//….................2	
    "Country",//….................3	
    "Channel",//….................4	
    "Medium",//….................5	
    "Campaign Source",//….................6	
    "Subsource",//….................7	
    "Campaign Name",//….................8	
    "Campaign Term",//….................9	
    "Campaign Content",//….................10	
    "Pre Sale Executive",//….................11	
    "Sale Executive",//….................12

    "Pre Sale Executive",//….................13
    "Sale Executive",//….................14

]


export const getLeadsFilterRestrictData = () => {

    let userData = JSON.parse(localStorage.getItem('epitomeUser'))
    let para_user = userData?.role

    if (para_user === userTypes[0]) {
        return []
    }

    else if (para_user === userTypes[1]) {
        return [
            "Campaign Term",
            "Campaign Content",
        ]
    }
    else if (para_user === userTypes[2]) {
        return [
            "Campaign Term",
            "Campaign Content",
        ]
    }
    else if (para_user === userTypes[3]) {
        return [
            "Subsource",
            "Campaign Name",
            "Campaign Term",
            "Campaign Content",
            "Sale Executive",
        ]
    }
    else if (para_user === userTypes[4]) {
        return [
            "Subsource",
            "Campaign Name",
            "Campaign Term",
            "Campaign Content",
            "Pre Sale Executive",
            "Sale Executive",
        ]
    }
    else if (para_user === userTypes[5]) {
        return [
            "Subsource",
            "Campaign Name",
            "Campaign Term",
            "Campaign Content",
            "Pre Sale Executive",
        ]
    }

    else if (para_user === userTypes[6]) {
        return [
            "Subsource",
            "Campaign Name",
            "Campaign Term",
            "Campaign Content",
            "Pre Sale Executive",
            "Sale Executive",
        ]
    }




}