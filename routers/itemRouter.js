const express = require('express')
const router = express.Router()
const axios = require('axios')
const URL_MARKET = 'https://apps.maxion.gg/api/market/list?status=LISTING&serverId=1'
const BASE_URL_Img = 'https://apps.maxion.gg/_next/image?url=https%3A%2F%2Frop2e-collection-cdn.s3-bkk.nipa.cloud%2F'
const buy_url = 'https://apps.maxion.gg/roverse/detail/'
let category = ['all','headgear', 'weapon', 'armor', 'card', 'shadowgear', 'costume']
let weapon_type = ['all','Katar','Bow','Mace','1hSword','2hSpear','2hSword']

router.post('/get_item', async (req,res) => {
    let {indexCategory , indexWeapon} = req.body
    let mode = category[indexCategory] || category[1]
    let mode_weapon = weapon_type[indexWeapon] || weapon_type[0]
    let response = []
    let list = []
    let sort = []
    try {
        switch (mode) {
            case 'all':
                response = await axios.get(`${URL_MARKET}`)
                if(!response.data || response.data.length <= 0){
                    throw({
                        msg : 'ไม่พบข้อมูล ลองใหม่อีกครั้ง',
                        code : '100'
                    })
                }
                res.send({
                    data : response.data
                })
                break;
            case 'headgear':
                response = await axios.get(`${URL_MARKET}&category=${mode}`)
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
                        list.push(obj)
                    }
                    sort = list.sort((a,b) => {
                        return a.price - b.price
                    })
                }
                res.send({
                    data : sort
                })
                break;
            case 'weapon':
                response = await axios.get(`${URL_MARKET}&category=${mode}`)
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
                                list.push(obj)
                            }
                            sort = list.sort((a,b) => {
                                return a.price - b.price
                            })
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
                                list.push(obj)
                            }
                            sort = list.sort((a,b) => {
                                return a.price - b.price
                            })
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
                                list.push(obj)
                            }
                            sort = list.sort((a,b) => {
                                return a.price - b.price
                            })
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
                                list.push(obj)
                            }
                            sort = list.sort((a,b) => {
                                return a.price - b.price
                            })
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
                                list.push(obj)
                            }
                            sort = list.sort((a,b) => {
                                return a.price - b.price
                            })
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
                                list.push(obj)
                            }
                            sort = list.sort((a,b) => {
                                return a.price - b.price
                            })
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
                                list.push(obj)
                            }
                            sort = list.sort((a,b) => {
                                return a.price - b.price
                            })
                        }
                        break;
                }
                res.send({
                    data : sort
                })
                break;
            case 'armor':
                response = await axios.get(`${URL_MARKET}&category=${mode}`)
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
                        list.push(obj)
                    }
                    sort = list.sort((a,b) => {
                        return a.price - b.price
                    })
                }
                res.send({
                    data : sort
                })
                break;
            case 'card':
                response = await axios.get(`${URL_MARKET}&category=${mode}`)
                if(!response.data || response.data.length <= 0){
                    throw({
                        msg : 'ไม่พบข้อมูล ลองใหม่อีกครั้ง',
                        code : '100'
                    })
                }
                res.send({
                    data : response.data
                })
                break;
            case 'shadowgear':
                response = await axios.get(`${URL_MARKET}&category=${mode}`)
                if(!response.data || response.data.length <= 0){
                    throw({
                        msg : 'ไม่พบข้อมูล ลองใหม่อีกครั้ง',
                        code : '100'
                    })
                }
                res.send({
                    data : response.data
                })
                break;
            case 'costume':
                response = await axios.get(`${URL_MARKET}&category=${mode}`)
                if(!response.data || response.data.length <= 0){
                    throw({
                        msg : 'ไม่พบข้อมูล ลองใหม่อีกครั้ง',
                        code : '100'
                    })
                }
                res.send({
                    data : response.data
                })
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