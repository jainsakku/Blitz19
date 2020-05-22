const path = require('path')
const router = require('express').Router()
const events = require('../events.json')
const workshops = require('../files/workshops.json')
const user = require("./models").user

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./datavis.html'))
})

router.get('/find', (req, res) => res.sendFile(path.resolve('./findID.html')))

router.post('/find', async (req, res) => {
    let {collegeID, firstName, lastName} = req.body
    let query = {}
    collegeID && collegeID.trim().toLowerCase() && (query.collegeID = collegeID)
    firstName && firstName.trim().toLowerCase() && (query.firstName = firstName)
    lastName && lastName.trim().toLowerCase() && (query.lastName = lastName)

    if (!(collegeID || firstName || lastName || blitzID)) {
        return res.status(400).json({ok:false,data:{err: "Fill at least one field"}})
    }

    user.find(query, {
        'blitzID': 1,
        'firstName': 1,
        'lastName': 1,
        'collegeID': 1,
        '_id': 0
    })
    .then(result => {
        if (!result.length) {
            return res.status(404).json({ok:false, data: {err: "No registration with these details"}})
        }
        return res.status(200).json({ok:true,data:{result: result}})
    })
})

router.get('/Panache', async function (req, res) {
    const xlsx = !!req.query.xlsx
    let query = {}
    query[`events.FineArts`] = {
        $elemMatch: {name: "Panache"}
    }
    const result = await user.find(query)
    const count = [{name: "Panache", value: []}]
    result.forEach(doc => {
        let eventData = doc.events.FineArts.filter(el => el.name === "Panache")
        count[0].value.push({
            firstName: doc.firstName,
            lastName: doc.lastName,
            email: doc.email,
            mob: doc.mob,
            blitzID: doc.blitzID,
            college: doc.college,
            collegeID: doc.collegeID,
            teamName: eventData[0].teamName,
            teamSize: eventData[0].teamSize
        })
    })
    if (xlsx) {
        // return res.xls(`${society}BlitzRegistrations.xlsx`, count);
    } else {
        return res.json({ok:true, data: count})
    }
})

router.get('/:society', async function (req, res) {
    const society = req.params.society
    const xlsx = !!req.query.xlsx
    if ( !(society in events) && !(society in workshops) ) {
        return res.status(404).json({ok: false, data: {}})
    }
    let eventsQuery = {}
    eventsQuery[`events.${society}.0`] = {
        $exists: true
    }

    let workshopsQuery = {}
    workshopsQuery[`workshops.${society}.0`] = {
        $exists: true
    }

    const result = await user.find({
        $or: [
            {
                registeredEvents: {
                    $elemMatch: {
                        society
                    }
                }
            },
            eventsQuery,
            workshopsQuery
        ]
    }, {
        blitzPIN: 0,
        isMNIT: 0,
        accomodation: 0,
        _id: 0
    })

    let count = events[society] || workshops[society]
    Object.keys(count).forEach(evt => {
        count[evt] = []
    });
    result.forEach(doc => {
        let events = doc.events[society]
        let registeredEvents = doc.registeredEvents
        Object.keys(count).forEach(evt => {
            let eventData = (events && events.filter(el => el.name === evt)) ||
            (registeredEvents && registeredEvents.filter(el => el.name === evt))
            if ( eventData && eventData.length ) {
                count[evt].push({
                    firstName: doc.firstName,
                    lastName: doc.lastName,
                    email: doc.email,
                    mob: doc.mob,
                    blitzID: doc.blitzID,
                    college: doc.college,
                    collegeID: doc.collegeID,
                    teamName: eventData[0].teamName,
                    teamSize: eventData[0].teamSize
                })
            }
        });
    })

    // if (xlsx) {
    //     const model = mongoXlsx.buildDynamicModel(count);

    //     mongoXlsx.mongoData2Xlsx(count, model, function(err, data) {
    //         console.log('File saved at:', data.fullPath);
    //     });
    //     // return res.xls(`${society}BlitzRegistrations.xlsx`, count);
    // } else {
        return res.json({ok:true, data:Object.keys(count).map(el => ({name: el, value: count[el]}))})
    // }

})

module.exports = router
