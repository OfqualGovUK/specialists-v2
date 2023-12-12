//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
// for tracking session data when using the prototype - to make it easy to spot any errors - posts data used to console
router.use((req, res, next) => {

    const log = {
      method: req.method,
      url: req.originalUrl,
      data: req.session.data
    }
    console.log(JSON.stringify(log, null, 2))

  next()
})

// routing to reapply flow when answer is yes - form is submitted to 'is-reapply'
router.post('/new/is-reapply', function (req, res) {

    // Make a variable and give it the value from 'isReapply'
    var isReapply = req.session.data['isReapply']
  
    // Check whether the variable matches a condition
    if (isReapply == "yes"){
      // Send user to next page
      res.redirect('/new/reapply-areas')
    } else {
      // Send user to ineligible page
      res.redirect('/new/reapply-complete')
    }
  
  })

  // routing to add new flow when answer is yes - form is submitted to 'is-new'
router.post('/new/additional/is-new', function (req, res) {

    // Make a variable and give it the value from 'isAddNew'
    var isAddNew = req.session.data['isAddNew']
  
    // Check whether the variable matches a condition
    if (isAddNew == "yes"){
      // Send user to next page
      res.redirect('/new/additional/subject-search')
    } else {
      // Send user to completed page
      res.redirect('/new/additional/completed')
    }
  
  })

  // This route has been stolen from old experts-prototype - original was contributed to by Joe Ingledew
router.get('/subject-search-answer', function (req, res) {
    const qualType = req.session.data.resultQualType
  
    let assessmentReferral = req.session.data.referrer
  
    // case-insensitive string match
    const qualTypeRegex = new RegExp(/End-point assessment/i)
    const qualLevelRegex = new RegExp(/T Level/i)
  
    const isMatch = qualTypeRegex.test(qualType) || qualLevelRegex.test(qualType)
  
    // if it's not End-point or T-level qual type they need to specify qual type and level
    if (assessmentReferral === "assessmentExpertise") {
      if (isMatch == false) {
        res.redirect('/new/additional/select-qualification-type')
      } else {
        res.redirect('/application/search/assessment-experience')
      }
    } else if (isMatch == false) {
      res.redirect('/new/additional/select-qualification-type')
    } else {
      res.redirect('/new/additional/select-activity')
    }
  })
  
  
  
