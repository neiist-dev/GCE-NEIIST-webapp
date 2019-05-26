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
        this.getThesis = getThesis;
        this.getThesisById = getThesisById;
        this.getThesisRecomendation = getThesisRecomendation;
        this.incrementClicks = incrementClicks;
        this.removeThesis = removeThesis;
        this.asyncAddThesis = asyncAddThesis;
        this.asyncAddThesisSpecialization = asyncAddThesisSpecialization;
        this.getThesisRecomendationByAdvisor = getThesisRecomendationByAdvisor;
        this.getThesisRecomendationByAreaAndAdvisor = getThesisRecomendationByAreaAndAdvisor;
    }
}

let access_thesis = module.exports = exports = new AccessThesis();


/********************************
 *  C.R.U.D. FUNCTIONS
 *******************************/
function addThesis(id, title, supervisors, vacancies, location, courses,
                   observations, objectives, status, requirements, areas,
                   clicks, type, lastModified, callback) {
    Thesis.find(
      {
          id: id
      }, (err, thesis) =>   {
          if (err)  {
              callback(err,null);
          }
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
                thesis[0].objectives === objectives && thesis[0].status === status && thesis[0].requirements === requirements
                && thesis[0].areas=== areas)  {
                  callback(null,result);
              }

              if (thesis[0].title !== title) {
                  Thesis.update({ id: id }, { $set: { title: title }}, (err,result) =>  {
                      if (err)  {
                          callback(err,null);
                      } else    {
                          callback(null, result);
                      }
                  });
              }
              if (thesis[0].supervisors !== supervisors) {
                  Thesis.update({ id: id }, { $set: { supervisors: supervisors }}, (err,result) =>  {
                      if (err)  {
                          callback(err,null);
                      } else    {
                          callback(null, result);
                      }
                  });
              }
              if (thesis[0].vacancies !== vacancies) {
                  Thesis.update({ id: id }, { $set: { vacancies: vacancies }}, (err,result) =>  {
                      if (err)  {
                          callback(err,null);
                      } else    {
                          callback(null, result);
                      }
                  });
              }
              if (thesis[0].observations !== observations) {
                  Thesis.update({ id: id }, { $set: { observations: observations }}, (err,result) =>  {
                      if (err)  {
                          callback(err,null);
                      } else    {
                          callback(null, result);
                      }
                  });
              }
              if (thesis[0].objectives !== objectives) {
                  Thesis.update({ id: id }, { $set: { objectives: objectives }}, (err,result) =>  {
                      if (err)  {
                          callback(err,null);
                      } else    {
                          callback(null, result);
                      }
                  });
              }
              if (thesis[0].status !== status) {
                  Thesis.update({ id: id }, { $set: { status: status }}, (err,result) =>  {
                      if (err)  {
                          callback(err,null);
                      } else    {
                          callback(null, result);
                      }
                  });
              }
              if (thesis[0].requirements !== requirements) {
                  Thesis.update({ id: id }, { $set: { requirements: requirements }}, (err,result) =>  {
                      if (err)  {
                          callback(err,null);
                      } else    {
                          callback(null, result);
                      }
                  });
              }

              if (thesis[0].areas !== areas) {
                  Thesis.update({ id: id }, { $set: { areas: areas }}, (err,result) =>  {
                      if (err)  {
                          callback(err,null);
                      } else    {
                          callback(null, result);
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
                  type: type,
                  clicks: clicks,
                  lastModified: lastModified
              });

              newThesis.save((err,result)=>   {
                  console.log(err);
                  if (err)  {
                      callback(err,null);
                  } else    {
                      callback(null, result);
                  }
              });
          }

      });

    /*

    */
}

async function asyncAddThesis(id, title, supervisors, vacancies, location, courses,
                   observations, objectives, status, requirements, areas,
                   clicks, type, lastModified, callback) {
    Thesis.find(
        {
            id: id
        }, (err, thesis) =>   {
            if (err)  {
               return new Error(err);
            }
            if (thesis[0]) {
                if (thesis[0].title === title && thesis[0].supervisors === supervisors &&
                    thesis[0].vacancies === vacancies && thesis[0].observations === observations &&
                    thesis[0].objectives === objectives && thesis[0].status === status && thesis[0].requirements === requirements
                    && thesis[0].areas=== areas)  {
                    return;
                }

                if (thesis[0].title !== title) {
                    Thesis.update({ id: id }, { $set: { title: title }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].supervisors !== supervisors) {
                    Thesis.update({ id: id }, { $set: { supervisors: supervisors }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].vacancies !== vacancies) {
                    Thesis.update({ id: id }, { $set: { vacancies: vacancies }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].observations !== observations) {
                    Thesis.update({ id: id }, { $set: { observations: observations }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].objectives !== objectives) {
                    Thesis.update({ id: id }, { $set: { objectives: objectives }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].status !== status) {
                    Thesis.update({ id: id }, { $set: { status: status }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].requirements !== requirements) {
                    Thesis.update({ id: id }, { $set: { requirements: requirements }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }

                if (thesis[0].areas !== areas) {
                    Thesis.update({ id: id }, { $set: { areas: areas }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
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
                    type: type,
                    clicks: clicks,
                    lastModified: lastModified
                });

                newThesis.save((err,result)=>   {
                    console.log(err);
                    if (err)  {
                        return new Error(err);
                    } else    {
                        return result;
                    }
                });
            }

        });
}

function addThesisArray(thesesArray, callback) {
    const NumberTheses = thesesArray.theses.length;
    let stats = {
        loaded: NumberTheses,
        unchanged: 0,
        modified: 0,
        added: 0
    };
    for (let i = 0; i < NumberTheses; i++) {
        addThesis(thesesArray.theses[i].id, thesesArray.theses[i].title, thesesArray.theses[i].supervisors,
          thesesArray.theses[i].vacancies, thesesArray.theses[i].location, thesesArray.theses[i].courses,
          thesesArray.theses[i].observations, thesesArray.theses[i].objectives, thesesArray.theses[i].status,
          thesesArray.theses[i].requirements, thesesArray.theses[i].areas, 0, thesesArray.theses[i].type,
          new Date(), (err, result) => {
              if (err) {
                  console.log(err);
                  reject(err);
              } else {
                  if (result.nModified === 1)   {
                      stats.modified++;
                  } else if (result.__v === 0)  {
                      //__v is the version of the document
                      stats.added++;
                  }
              }

          });
    }

    callback(null, stats)
}
async function asyncAddThesis(id, title, supervisors, vacancies, location, courses,
                              observations, objectives, status, requirements, areas,
                              clicks, type, lastModified, callback) {
    Thesis.find(
        {
            id: id
        }, (err, thesis) =>   {
            if (err)  {
                return new Error(err);
            }
            if (thesis[0]) {
                if (thesis[0].title === title && thesis[0].supervisors === supervisors &&
                    thesis[0].vacancies === vacancies && thesis[0].observations === observations &&
                    thesis[0].objectives === objectives && thesis[0].status === status && thesis[0].requirements === requirements
                    && thesis[0].areas=== areas)  {
                    return;
                }

                if (thesis[0].title !== title) {
                    Thesis.update({ id: id }, { $set: { title: title }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].supervisors !== supervisors) {
                    Thesis.update({ id: id }, { $set: { supervisors: supervisors }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].vacancies !== vacancies) {
                    Thesis.update({ id: id }, { $set: { vacancies: vacancies }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].observations !== observations) {
                    Thesis.update({ id: id }, { $set: { observations: observations }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].objectives !== objectives) {
                    Thesis.update({ id: id }, { $set: { objectives: objectives }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].status !== status) {
                    Thesis.update({ id: id }, { $set: { status: status }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].requirements !== requirements) {
                    Thesis.update({ id: id }, { $set: { requirements: requirements }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }

                if (thesis[0].areas !== areas) {
                    Thesis.update({ id: id }, { $set: { areas: areas }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
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
                    type: type,
                    clicks: clicks,
                    lastModified: lastModified
                });

                newThesis.save((err,result)=>   {
                    console.log(err);
                    if (err)  {
                        return new Error(err);
                    } else    {
                        return result;
                    }
                });
            }

        });
}

function addThesisArray(thesesArray, callback) {
    const NumberTheses = thesesArray.theses.length;
    let stats = {
        loaded: NumberTheses,
        unchanged: 0,
        modified: 0,
        added: 0
    };
    for (let i = 0; i < NumberTheses; i++) {
        addThesis(thesesArray.theses[i].id, thesesArray.theses[i].title, thesesArray.theses[i].supervisors,
            thesesArray.theses[i].vacancies, thesesArray.theses[i].location, thesesArray.theses[i].courses,
            thesesArray.theses[i].observations, thesesArray.theses[i].objectives, thesesArray.theses[i].status,
            thesesArray.theses[i].requirements, thesesArray.theses[i].areas, 0, thesesArray.theses[i].type,
            new Date(), (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    if (result.nModified === 1)   {
                        stats.modified++;
                    } else if (result.__v === 0)  {
                        //__v is the version of the document
                        stats.added++;
                    }
                }

            });
    }

    callback(null, stats)
}


async function asyncAddThesisSpecialization(id, title, supervisors, vacancies, location, courses,
                              observations, objectives, status, requirements, areas, specializationAreas,
                              clicks, type, lastModified, callback) {
    Thesis.find(
        {
            id: id
        }, (err, thesis) =>   {
            if (err)  {
                return new Error(err);
            }
            if (thesis[0]) {
                if (thesis[0].title === title && thesis[0].supervisors === supervisors &&
                    thesis[0].vacancies === vacancies && thesis[0].observations === observations &&
                    thesis[0].objectives === objectives && thesis[0].status === status && thesis[0].requirements === requirements
                    && thesis[0].areas=== areas)  {
                    return;
                }

                if (thesis[0].title !== title) {
                    Thesis.update({ id: id }, { $set: { title: title }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].supervisors !== supervisors) {
                    Thesis.update({ id: id }, { $set: { supervisors: supervisors }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].vacancies !== vacancies) {
                    Thesis.update({ id: id }, { $set: { vacancies: vacancies }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].observations !== observations) {
                    Thesis.update({ id: id }, { $set: { observations: observations }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].objectives !== objectives) {
                    Thesis.update({ id: id }, { $set: { objectives: objectives }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].status !== status) {
                    Thesis.update({ id: id }, { $set: { status: status }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }
                if (thesis[0].requirements !== requirements) {
                    Thesis.update({ id: id }, { $set: { requirements: requirements }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
                        }
                    });
                }

                if (thesis[0].areas !== areas) {
                    Thesis.update({ id: id }, { $set: { areas: areas }}, (err,result) =>  {
                        if (err)  {
                            return new Error(err);
                        } else    {
                            return result;
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
                    specializationAreas: specializationAreas,
                    type: type,
                    clicks: clicks,
                    lastModified: lastModified
                });

                newThesis.save((err,result)=>   {
                    console.log(err);
                    if (err)  {
                        return new Error(err);
                    } else    {
                        return result;
                    }
                });
            }

        });
}

function addThesisArray(thesesArray, callback) {
    const NumberTheses = thesesArray.theses.length;
    let stats = {
        loaded: NumberTheses,
        unchanged: 0,
        modified: 0,
        added: 0
    };
    for (let i = 0; i < NumberTheses; i++) {
        addThesis(thesesArray.theses[i].id, thesesArray.theses[i].title, thesesArray.theses[i].supervisors,
          thesesArray.theses[i].vacancies, thesesArray.theses[i].location, thesesArray.theses[i].courses,
          thesesArray.theses[i].observations, thesesArray.theses[i].objectives, thesesArray.theses[i].status,
          thesesArray.theses[i].requirements, thesesArray.theses[i].areas, 0, thesesArray.theses[i].type,
          new Date(), (err, result) => {
              if (err) {
                  console.log(err);
                  reject(err);
              } else {
                  if (result.nModified === 1)   {
                      stats.modified++;
                  } else if (result.__v === 0)  {
                      //__v is the version of the document
                      stats.added++;
                  }
              }

          });
    }

    callback(null, stats)
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

async function getThesis() {
    let query = Thesis.find({});
    let docs = await query.exec();
    return docs;
}

async function getThesisById(id) {
    let query = Thesis.findOne({id: id});
    let docs = await query.exec();
    return docs;
}

async function getThesisRecomendation(arraySpecialization) {
    let thesisIdSet = new Set();
    let result = [];
    //todo primeira area -> fazer match com primeira posição do array; segunda área -> fazer match tambem e só devolver 2 teses
    for (let area of arraySpecialization)  {
        let query = Thesis.find({specializationAreas: {$eq: area}});
        var docs = await query.exec();
        for (let i = 0; i < docs.length; i++) {
            let item = docs[Math.floor(Math.random()*docs.length)];

            //Thesis is not repeated
            if (thesisIdSet.has(item.id)) {
                i--;
            } else  {
                //Repeat
                thesisIdSet.add(item.id);
                result.push(item);
            }

        }

    }


    return result;
}
async function getThesisRecomendationByAdvisor(advisor) {
    let thesisIdSet = new Set();
    let result = [];
    //todo primeira area -> fazer match com primeira posição do array; segunda área -> fazer match tambem e só devolver 2 teses
        let query = Thesis.find({supervisors: {$regex: advisor}});
        var docs = await query.exec();
        for (let i = 0; i < docs.length; i++) {
            let item = docs[Math.floor(Math.random()*docs.length)];

            //Thesis is not repeated
            if (thesisIdSet.has(item.id)) {
                i--;
            } else  {
                //Repeat
                thesisIdSet.add(item.id);
                result.push(item);
            }

        }
    return result;
}

async function getThesisRecomendationByAreaAndAdvisor(area, advisor) {
    let thesisIdSet = new Set();
    let result = [];
    //todo primeira area -> fazer match com primeira posição do array; segunda área -> fazer match tambem e só devolver 2 teses
    let query = Thesis.find({$and: [{specializationAreas: {$eq: area}}, {supervisors: {$regex: advisor}}]});
    var docs = await query.exec();
    for (let i = 0; i < docs.length; i++) {
        let item = docs[Math.floor(Math.random()*docs.length)];

        //Thesis is not repeated
        if (thesisIdSet.has(item.id)) {
            i--;
        } else  {
            //Repeat
            thesisIdSet.add(item.id);
            result.push(item);
        }

    }
    return result;
}

async function incrementClicks(id) {
    let query = Thesis.findOneAndUpdate({id: id}, {$inc: {'clicks': 1}});
    let docs = await query.exec();
    return docs;
}


function removeThesis(){
  
}