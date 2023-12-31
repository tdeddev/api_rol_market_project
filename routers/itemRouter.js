const express = require('express')
const router = express.Router()
const axios = require('axios')
const URL_MARKET = 'https://apps.maxion.gg/api/market/list?status=LISTING&'
const server = ['serverId=1', 'serverId=2']
const BASE_URL_Img = 'https://apps.maxion.gg/_next/image?url=https%3A%2F%2Frop2e-collection-cdn.s3-bkk.nipa.cloud%2F'
const buy_url = 'https://apps.maxion.gg/roverse/detail/'
let category = ['all','headgear', 'weapon', 'armor', 'card', 'shadowgear', 'costume']
let weapon_type = ['all','Katar','Bow','Mace','1hSword','2hSpear','2hSword']
let mode_search = ['new', 'low', 'high']

router.post('/get_item', async (req,res) => {
    let {indexCategory , indexWeapon, indexSearch, indexServer} = req.body
    let mode = category[indexCategory] || category[1]
    let mode_weapon = weapon_type[indexWeapon] || weapon_type[0]
    let search = mode_search[indexSearch] || mode_search[0]
    let sv = server[indexServer] || server[0]
    let response = []
    let list = []
    let sort = []
    try {
        switch (mode) {
            case 'all':
                response = await axios.get(`${URL_MARKET}${sv}`)
                if(!response.data || response.data.length <= 0){
                    throw({
                        msg : 'ไม่พบข้อมูล ลองใหม่อีกครั้ง',
                        code : '100'
                    })
                }
                for(let i = 0; i < response.data.length; i++){
                    let obj = {
                        img : `${BASE_URL_Img}${response.data[i].nft.nameid}.png&w=256&q=75`,
                        name : response.data[i].nft.nameEnglish,
                        price : Number(response.data[i].price),
                        url : `${buy_url}${response.data[i].id}`
                    }
                    if(!!response.data[i].nft.option0Text){
                        obj.option1 = response.data[i].nft.option0Text
                    }
                    if(!!response.data[i].nft.option1Text){
                        obj.option2 = response.data[i].nft.option1Text
                    }
                    if(!!response.data[i].nft.option2Text){
                        obj.option3 = response.data[i].nft.option2Text
                    }
                    if(!!response.data[i].nft.option3Text){
                        obj.option4 = response.data[i].nft.option3Text
                    }
                    if(!!response.data[i].nft.option4Text){
                        obj.option5 = response.data[i].nft.option4Text
                    }
                    if(!!response.data[i].nft.refine){
                        obj.refine = response.data[i].nft.refine
                    }
                    if(!!response.data[i].nft.card0Name){
                        obj.card1 = response.data[i].nft.card0Name
                    }
                    if(!!response.data[i].nft.card1Name){
                        obj.card2 = response.data[i].nft.card1Name
                    }
                    if(!!response.data[i].nft.card2Name){
                        obj.card3 = response.data[i].nft.card2Name
                    }
                    if(!!response.data[i].nft.slots){
                        obj.slot = response.data[i].nft.slots
                    }
                    list.push(obj)
                }
                switch (search) {
                    case 'low':
                        sort = list.sort((a,b) => {
                            return a.price - b.price
                        })
                        res.send({
                            data : sort
                        })
                        break;
                    case 'high':
                        sort = list.sort((a,b) => {
                            return b.price - a.price
                        })
                        res.send({
                            data : sort
                        })
                        break;
                
                    default:
                        res.send({
                            data : list
                        })
                        break;
                }
                break;
            case 'headgear':
                response = await axios.get(`${URL_MARKET}${sv}&category=${mode}`)
                if(!response.data || response.data.length <= 0){
                    throw({
                        msg : 'ไม่พบข้อมูล ลองใหม่อีกครั้ง',
                        code : '100'
                    })
                }
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].nft.refine >= 7 && !!response.data[i].nft.option0Text){
                        let obj = {
                            img : `${BASE_URL_Img}${response.data[i].nft.nameid}.png&w=256&q=75`,
                            name : response.data[i].nft.nameEnglish,
                            price : Number(response.data[i].price),
                            refine : response.data[i].nft.refine,
                            option1 : response.data[i].nft.option0Text,
                            option2 : response.data[i].nft.option1Text,
                            option3 : response.data[i].nft.option2Text,
                            option4 : response.data[i].nft.option3Text,
                            option5 : response.data[i].nft.option4Text,
                            url : `${buy_url}${response.data[i].id}`
                        }
                        if(!!response.data[i].nft.card0Name){
                            obj.card1 = response.data[i].nft.card0Name
                        }
                        if(!!response.data[i].nft.card1Name){
                            obj.card2 = response.data[i].nft.card1Name
                        }
                        if(!!response.data[i].nft.card2Name){
                            obj.card3 = response.data[i].nft.card2Name
                        }
                        if(!!response.data[i].nft.slots){
                            obj.slot = response.data[i].nft.slots
                        }
                        list.push(obj)
                    }
                }
                switch (search) {
                    case 'low':
                        sort = list.sort((a,b) => {
                            return a.price - b.price
                        })
                        res.send({
                            data : sort
                        })
                        break;
                    case 'high':
                        sort = list.sort((a,b) => {
                            return b.price - a.price
                        })
                        res.send({
                            data : sort
                        })
                        break;
                
                    default:
                        res.send({
                            data : list
                        })
                        break;
                }
                break;
            case 'weapon':
                response = await axios.get(`${URL_MARKET}${sv}&category=${mode}`)
                if(!response.data || response.data.length <= 0){
                    throw({
                        msg : 'ไม่พบข้อมูล ลองใหม่อีกครั้ง',
                        code : '100'
                    })
                }
                //['Katar','Bow','Mace','1hSword','2hSpear','2hSword']
                switch (mode_weapon) {
                    case 'Katar':
                        for(let i = 0; i < response.data.length; i++){
                            if(response.data[i].nft.refine >= 7 && !!response.data[i].nft.option0Text && response.data[i].nft.subtype == mode_weapon){
                                let obj = {
                                    img : `${BASE_URL_Img}${response.data[i].nft.nameid}.png&w=256&q=75`,
                                    name : response.data[i].nft.nameEnglish,
                                    price : Number(response.data[i].price),
                                    refine : response.data[i].nft.refine,
                                    option1 : response.data[i].nft.option0Text,
                                    option2 : response.data[i].nft.option1Text,
                                    option3 : response.data[i].nft.option2Text,
                                    option4 : response.data[i].nft.option3Text,
                                    option5 : response.data[i].nft.option4Text,
                                    url : `${buy_url}${response.data[i].id}`
                                }
                                if(!!response.data[i].nft.card0Name){
                                    obj.card1 = response.data[i].nft.card0Name
                                }
                                if(!!response.data[i].nft.card1Name){
                                    obj.card2 = response.data[i].nft.card1Name
                                }
                                if(!!response.data[i].nft.card2Name){
                                    obj.card3 = response.data[i].nft.card2Name
                                }
                                if(!!response.data[i].nft.slots){
                                    obj.slot = response.data[i].nft.slots
                                }
                                list.push(obj)
                            }
                        }
                        break;
                
                    case 'Bow':
                        for(let i = 0; i < response.data.length; i++){
                            if(response.data[i].nft.refine >= 7 && !!response.data[i].nft.option0Text && response.data[i].nft.subtype == mode_weapon){
                                let obj = {
                                    img : `${BASE_URL_Img}${response.data[i].nft.nameid}.png&w=256&q=75`,
                                    name : response.data[i].nft.nameEnglish,
                                    price : Number(response.data[i].price),
                                    refine : response.data[i].nft.refine,
                                    option1 : response.data[i].nft.option0Text,
                                    option2 : response.data[i].nft.option1Text,
                                    option3 : response.data[i].nft.option2Text,
                                    option4 : response.data[i].nft.option3Text,
                                    option5 : response.data[i].nft.option4Text,
                                    url : `${buy_url}${response.data[i].id}`
                                }
                                if(!!response.data[i].nft.card0Name){
                                    obj.card1 = response.data[i].nft.card0Name
                                }
                                if(!!response.data[i].nft.card1Name){
                                    obj.card2 = response.data[i].nft.card1Name
                                }
                                if(!!response.data[i].nft.card2Name){
                                    obj.card3 = response.data[i].nft.card2Name
                                }
                                if(!!response.data[i].nft.slots){
                                    obj.slot = response.data[i].nft.slots
                                }
                                list.push(obj)
                            }
                        }
                        break;
                
                    case 'Mace':
                        for(let i = 0; i < response.data.length; i++){
                            if(response.data[i].nft.refine >= 7 && !!response.data[i].nft.option0Text && response.data[i].nft.subtype == mode_weapon){
                                let obj = {
                                    img : `${BASE_URL_Img}${response.data[i].nft.nameid}.png&w=256&q=75`,
                                    name : response.data[i].nft.nameEnglish,
                                    price : Number(response.data[i].price),
                                    refine : response.data[i].nft.refine,
                                    option1 : response.data[i].nft.option0Text,
                                    option2 : response.data[i].nft.option1Text,
                                    option3 : response.data[i].nft.option2Text,
                                    option4 : response.data[i].nft.option3Text,
                                    option5 : response.data[i].nft.option4Text,
                                    url : `${buy_url}${response.data[i].id}`
                                }
                                if(!!response.data[i].nft.card0Name){
                                    obj.card1 = response.data[i].nft.card0Name
                                }
                                if(!!response.data[i].nft.card1Name){
                                    obj.card2 = response.data[i].nft.card1Name
                                }
                                if(!!response.data[i].nft.card2Name){
                                    obj.card3 = response.data[i].nft.card2Name
                                }
                                if(!!response.data[i].nft.slots){
                                    obj.slot = response.data[i].nft.slots
                                }
                                list.push(obj)
                            }
                        }
                        break;
                
                    case '1hSword':
                        for(let i = 0; i < response.data.length; i++){
                            if(response.data[i].nft.refine >= 7 && !!response.data[i].nft.option0Text && response.data[i].nft.subtype == mode_weapon){
                                let obj = {
                                    img : `${BASE_URL_Img}${response.data[i].nft.nameid}.png&w=256&q=75`,
                                    name : response.data[i].nft.nameEnglish,
                                    price : Number(response.data[i].price),
                                    refine : response.data[i].nft.refine,
                                    option1 : response.data[i].nft.option0Text,
                                    option2 : response.data[i].nft.option1Text,
                                    option3 : response.data[i].nft.option2Text,
                                    option4 : response.data[i].nft.option3Text,
                                    option5 : response.data[i].nft.option4Text,
                                    url : `${buy_url}${response.data[i].id}`
                                }
                                if(!!response.data[i].nft.card0Name){
                                    obj.card1 = response.data[i].nft.card0Name
                                }
                                if(!!response.data[i].nft.card1Name){
                                    obj.card2 = response.data[i].nft.card1Name
                                }
                                if(!!response.data[i].nft.card2Name){
                                    obj.card3 = response.data[i].nft.card2Name
                                }
                                if(!!response.data[i].nft.slots){
                                    obj.slot = response.data[i].nft.slots
                                }
                                list.push(obj)
                            }
                        }
                        break;
                
                    case '2hSpear':
                        for(let i = 0; i < response.data.length; i++){
                            if(response.data[i].nft.refine >= 7 && !!response.data[i].nft.option0Text && response.data[i].nft.subtype == mode_weapon){
                                let obj = {
                                    img : `${BASE_URL_Img}${response.data[i].nft.nameid}.png&w=256&q=75`,
                                    name : response.data[i].nft.nameEnglish,
                                    price : Number(response.data[i].price),
                                    refine : response.data[i].nft.refine,
                                    option1 : response.data[i].nft.option0Text,
                                    option2 : response.data[i].nft.option1Text,
                                    option3 : response.data[i].nft.option2Text,
                                    option4 : response.data[i].nft.option3Text,
                                    option5 : response.data[i].nft.option4Text,
                                    url : `${buy_url}${response.data[i].id}`
                                }
                                if(!!response.data[i].nft.card0Name){
                                    obj.card1 = response.data[i].nft.card0Name
                                }
                                if(!!response.data[i].nft.card1Name){
                                    obj.card2 = response.data[i].nft.card1Name
                                }
                                if(!!response.data[i].nft.card2Name){
                                    obj.card3 = response.data[i].nft.card2Name
                                }
                                if(!!response.data[i].nft.slots){
                                    obj.slot = response.data[i].nft.slots
                                }
                                list.push(obj)
                            }
                        }
                        break;
                
                    case '2hSword':
                        for(let i = 0; i < response.data.length; i++){
                            if(response.data[i].nft.refine >= 7 && !!response.data[i].nft.option0Text && response.data[i].nft.subtype == mode_weapon){
                                let obj = {
                                    img : `${BASE_URL_Img}${response.data[i].nft.nameid}.png&w=256&q=75`,
                                    name : response.data[i].nft.nameEnglish,
                                    price : Number(response.data[i].price),
                                    refine : response.data[i].nft.refine,
                                    option1 : response.data[i].nft.option0Text,
                                    option2 : response.data[i].nft.option1Text,
                                    option3 : response.data[i].nft.option2Text,
                                    option4 : response.data[i].nft.option3Text,
                                    option5 : response.data[i].nft.option4Text,
                                    url : `${buy_url}${response.data[i].id}`
                                }
                                if(!!response.data[i].nft.card0Name){
                                    obj.card1 = response.data[i].nft.card0Name
                                }
                                if(!!response.data[i].nft.card1Name){
                                    obj.card2 = response.data[i].nft.card1Name
                                }
                                if(!!response.data[i].nft.card2Name){
                                    obj.card3 = response.data[i].nft.card2Name
                                }
                                if(!!response.data[i].nft.slots){
                                    obj.slot = response.data[i].nft.slots
                                }
                                list.push(obj)
                            }
                        }
                        break;
                
                    default:
                        for(let i = 0; i < response.data.length; i++){
                            if(response.data[i].nft.refine >= 7 && !!response.data[i].nft.option0Text){
                                let obj = {
                                    img : `${BASE_URL_Img}${response.data[i].nft.nameid}.png&w=256&q=75`,
                                    name : response.data[i].nft.nameEnglish,
                                    price : Number(response.data[i].price),
                                    refine : response.data[i].nft.refine,
                                    option1 : response.data[i].nft.option0Text,
                                    option2 : response.data[i].nft.option1Text,
                                    option3 : response.data[i].nft.option2Text,
                                    option4 : response.data[i].nft.option3Text,
                                    option5 : response.data[i].nft.option4Text,
                                    url : `${buy_url}${response.data[i].id}`
                                }
                                if(!!response.data[i].nft.card0Name){
                                    obj.card1 = response.data[i].nft.card0Name
                                }
                                if(!!response.data[i].nft.card1Name){
                                    obj.card2 = response.data[i].nft.card1Name
                                }
                                if(!!response.data[i].nft.card2Name){
                                    obj.card3 = response.data[i].nft.card2Name
                                }
                                if(!!response.data[i].nft.slots){
                                    obj.slot = response.data[i].nft.slots
                                }
                                list.push(obj)
                            }
                        }
                        break;
                }
                switch (search) {
                    case 'low':
                        sort = list.sort((a,b) => {
                            return a.price - b.price
                        })
                        res.send({
                            data : sort
                        })
                        break;
                    case 'high':
                        sort = list.sort((a,b) => {
                            return b.price - a.price
                        })
                        res.send({
                            data : sort
                        })
                        break;
                
                    default:
                        res.send({
                            data : list
                        })
                        break;
                }
                break;
            case 'armor':
                response = await axios.get(`${URL_MARKET}${sv}&category=${mode}`)
                if(!response.data || response.data.length <= 0){
                    throw({
                        msg : 'ไม่พบข้อมูล ลองใหม่อีกครั้ง',
                        code : '100'
                    })
                }
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].nft.refine >= 7 && !!response.data[i].nft.option0Text){
                        let obj = {
                            img : `${BASE_URL_Img}${response.data[i].nft.nameid}.png&w=256&q=75`,
                            name : response.data[i].nft.nameEnglish,
                            price : Number(response.data[i].price),
                            refine : response.data[i].nft.refine,
                            option1 : response.data[i].nft.option0Text,
                            option2 : response.data[i].nft.option1Text,
                            option3 : response.data[i].nft.option2Text,
                            option4 : response.data[i].nft.option3Text,
                            option5 : response.data[i].nft.option4Text,
                            url : `${buy_url}${response.data[i].id}`
                        }
                        if(!!response.data[i].nft.card0Name){
                            obj.card1 = response.data[i].nft.card0Name
                        }
                        if(!!response.data[i].nft.card1Name){
                            obj.card2 = response.data[i].nft.card1Name
                        }
                        if(!!response.data[i].nft.card2Name){
                            obj.card3 = response.data[i].nft.card2Name
                        }
                        if(!!response.data[i].nft.slots){
                            obj.slot = response.data[i].nft.slots
                        }
                        list.push(obj)
                    }
                }
                switch (search) {
                    case 'low':
                        sort = list.sort((a,b) => {
                            return a.price - b.price
                        })
                        res.send({
                            data : sort
                        })
                        break;
                    case 'high':
                        sort = list.sort((a,b) => {
                            return b.price - a.price
                        })
                        res.send({
                            data : sort
                        })
                        break;
                
                    default:
                        res.send({
                            data : list
                        })
                        break;
                }
                break;
            case 'card':
                response = await axios.get(`${URL_MARKET}${sv}&category=${mode}`)
                if(!response.data || response.data.length <= 0){
                    throw({
                        msg : 'ไม่พบข้อมูล ลองใหม่อีกครั้ง',
                        code : '100'
                    })
                }
                for(let i = 0; i < response.data.length; i++){
                    let obj = {
                        img : `${BASE_URL_Img}${response.data[i].nft.nameid}.png&w=256&q=75`,
                        name : response.data[i].nft.nameEnglish,
                        price : Number(response.data[i].price),
                        url : `${buy_url}${response.data[i].id}`
                    }
                    if(!!response.data[i].nft.slots){
                        obj.slot = response.data[i].nft.slots
                    }
                    list.push(obj)
                }
                switch (search) {
                    case 'low':
                        sort = list.sort((a,b) => {
                            return a.price - b.price
                        })
                        res.send({
                            data : sort
                        })
                        break;
                    case 'high':
                        sort = list.sort((a,b) => {
                            return b.price - a.price
                        })
                        res.send({
                            data : sort
                        })
                        break;
                
                    default:
                        res.send({
                            data : list
                        })
                        break;
                }
                break;
            case 'shadowgear':
                response = await axios.get(`${URL_MARKET}${sv}&category=${mode}`)
                if(!response.data || response.data.length <= 0){
                    throw({
                        msg : 'ไม่พบข้อมูล ลองใหม่อีกครั้ง',
                        code : '100'
                    })
                }
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].nft.refine >= 0 && response.data[i].nft.type == 'Shadowgear'){
                        let obj = {
                            img : `${BASE_URL_Img}${response.data[i].nft.nameid}.png&w=256&q=75`,
                            name : response.data[i].nft.nameEnglish,
                            price : Number(response.data[i].price),
                            refine : response.data[i].nft.refine,
                            url : `${buy_url}${response.data[i].id}`
                        }
                        if(!!response.data[i].nft.card0Name){
                            obj.card1 = response.data[i].nft.card0Name
                        }
                        if(!!response.data[i].nft.card1Name){
                            obj.card2 = response.data[i].nft.card1Name
                        }
                        if(!!response.data[i].nft.card2Name){
                            obj.card3 = response.data[i].nft.card2Name
                        }
                        if(!!response.data[i].nft.slots){
                            obj.slot = response.data[i].nft.slots
                        }
                        list.push(obj)
                    }
                }
                switch (search) {
                    case 'low':
                        sort = list.sort((a,b) => {
                            return a.price - b.price
                        })
                        res.send({
                            data : sort
                        })
                        break;
                    case 'high':
                        sort = list.sort((a,b) => {
                            return b.price - a.price
                        })
                        res.send({
                            data : sort
                        })
                        break;
                
                    default:
                        res.send({
                            data : list
                        })
                        break;
                }
                break;
            case 'costume':
                response = await axios.get(`${URL_MARKET}${sv}&category=${mode}`)
                if(!response.data || response.data.length <= 0){
                    throw({
                        msg : 'ไม่พบข้อมูล ลองใหม่อีกครั้ง',
                        code : '100'
                    })
                }
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].nft.locationCostumeHeadTop == 1 || response.data[i].nft.locationCostumeHeadMid == 1 || response.data[i].nft.locationCostumeHeadLow == 1 || response.data[i].nft.locationCostumeGarment == 1){
                        let obj = {
                            img : `${BASE_URL_Img}${response.data[i].nft.nameid}.png&w=256&q=75`,
                            name : response.data[i].nft.nameEnglish,
                            price : Number(response.data[i].price),
                            url : `${buy_url}${response.data[i].id}`
                        }
                        if(!!response.data[i].nft.slots){
                            obj.slot = response.data[i].nft.slots
                        }
                        list.push(obj)
                    }
                }
                switch (search) {
                    case 'low':
                        sort = list.sort((a,b) => {
                            return a.price - b.price
                        })
                        res.send({
                            data : sort
                        })
                        break;
                    case 'high':
                        sort = list.sort((a,b) => {
                            return b.price - a.price
                        })
                        res.send({
                            data : sort
                        })
                        break;
                
                    default:
                        res.send({
                            data : list
                        })
                        break;
                }
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error)
        res.send({
            msg : error.msg
        })
    }
})

module.exports = router