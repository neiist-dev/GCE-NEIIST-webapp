const Thesis = require('../models/thesis');
const AccessProposal = require('../models/proposal');
const Utils = require('./utils-accesses');

let TYPE = 'Thesis';

class AccessThesis {
    constructor() {
        this.addThesis = addThesis;
        this.updateThesis = updateThesis;
        this.getNumberOfThesis = getNumberOfThesis;
        this.getThesisByArea = getThesisByArea;
        this.addThesisArray = addThesisArray;
    }
}

let access_thesis = module.exports = exports = new AccessThesis();


/********************************
 *  C.R.U.D. FUNCTIONS
 *******************************/
function addThesis(id, title, supervisors, vacancies, location, courses,
                   observations, objectives, status, requirements, areas,
                   clicks, lastModified, callback) {
    Thesis.find(
      {
          id: id
      }, (err, thesis) =>   {
          //Returns array with object
          //Thesis exist, let's see if we want to replace something

          /*
          stats = {
              thesesLoaded: NumberTheses,
              added: added,
              modified: modified,
              unchanged: unchanged
          };*/

          if (thesis[0]) {
              if (thesis[0].title === title && thesis[0].supervisors === supervisors &&
                thesis[0].vacancies === vacancies && thesis[0].observations === observations &&
                thesis[0].objectives === objectives && thesis[0].status === status && thesis[0].requirements === requirements)  {
                  callback(null,"unchanged");
              }

              if (thesis[0].title !== title) {
                  Thesis.update({ id: id }, { $set: { title: title }}, (err,result) =>  {
                      if (err)  {
                          callback(err,null);
                      } else    {
                          callback(null, "modified");
                      }
                  });
              }
              if (thesis[0].supervisors !== supervisors) {
                  Thesis.update({ id: id }, { $set: { supervisors: supervisors }}, (err,result) =>  {
                      if (err)  {
                          callback(err,null);
                      } else    {
                          callback(null, "modified");
                      }
                  });
              }
              if (thesis[0].vacancies !== vacancies) {
                  Thesis.update({ id: id }, { $set: { vacancies: vacancies }}, (err,result) =>  {
                      if (err)  {
                          callback(err,null);
                      } else    {
                          callback(null, "modified");
                      }
                  });
              }
              if (thesis[0].observations !== observations) {
                  Thesis.update({ id: id }, { $set: { observations: observations }}, (err,result) =>  {
                      if (err)  {
                          callback(err,null);
                      } else    {
                          callback(null, "modified");
                      }
                  });
              }
              if (thesis[0].objectives !== objectives) {
                  Thesis.update({ id: id }, { $set: { objectives: objectives }}, (err,result) =>  {
                      if (err)  {
                          callback(err,null);
                      } else    {
                          callback(null, "modified");
                      }
                  });
              }
              if (thesis[0].status !== status) {
                  Thesis.update({ id: id }, { $set: { status: status }}, (err,result) =>  {
                      if (err)  {
                          callback(err,null);
                      } else    {
                          callback(null, "modified");
                      }
                  });
              }
              if (thesis[0].requirements !== requirements) {
                  Thesis.update({ id: id }, { $set: { requirements: requirements }}, (err,result) =>  {
                      if (err)  {
                          callback(err,null);
                      } else    {
                          callback(null, "modified");
                      }
                  });
              }
          } else    {
              let newThesis = new Thesis({
                  id: id,
                  title: title,
                  supervisors: supervisors,
                  vacancies: vacancies,
                  location: location,
                  courses: courses,
                  observations: observations,
                  objectives: objectives,
                  status: status,
                  requirements: requirements,
                  areas: areas,
                  clicks: clicks,
                  lastModified: lastModified
              });

              newThesis.save((err,result)=>   {
                  if (err)  {
                      callback(err,null);
                  } else    {
                      callback(null, "added");
                  }
              });
          }

      });

    /*

    */
}

function addThesisArray(thesesArray, callback) {
    const NumberTheses = thesesArray.length;
    for (let i = 0; i < NumberTheses; i++)  {
        addThesis(thesesArray[i].id, thesesArray[i].title, thesesArray[i].supervisors,
          thesesArray[i].vacancies, thesesArray[i].location, thesesArray[i].courses,
          thesesArray[i].observations, thesesArray[i].objectives, thesesArray[i].status,
          thesesArray[i].requirements, thesesArray[i].areas, "", new Date(), callback)
    }

}


//TODO: May update only one field. Status may not be modified here
function updateThesis(id, description, requirements,
                      date_beginning, date_end,
                      salary, observations, vacancies,
                      link, lastModifiedDate, callback) {



    Proposal.findByIdAndUpdate(id, update, options, callback);
}

function getNumberOfThesis(callback) {
    Thesis.count(callback);
}

function getThesisByArea(area, callback) {
    Thesis.find(
      {
          area: { $in: area }
      }
      , callback)
}



