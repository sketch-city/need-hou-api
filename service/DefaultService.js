'use strict';
var queries = require('../queries');




/**
 *
 * no response value expected for this operation
 **/
exports.agenciesOPTIONS = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}




/**
 * Create an agency
 *
 * agency_data AgencyModel data for new agency
 * no response value expected for this operation
 **/
exports.createAgency = function(agency_data) {
  return queries.createAgency(agency_data)
    .then(function(result){
  return new Promise(function(resolve, reject) {
    resolve(result);
    });
  });
}



/**
 * Create program languages
 *
 * language_data LanguageModel data for new language
 * no response value expected for this operation
 **/
exports.createLanguages = function(language_data) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Create new program
 *
 * program_data ProgramModel data for new program
 * no response value expected for this operation
 **/
exports.createProgram = function(program_data) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Add item to queue
 *
 * queue_data QueueModel data for new program to be added to queue
 * no response value expected for this operation
 **/
exports.createQueue = function(queue_data) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get agencies
 *
 * name String Filter by agency name (optional)
 * returns String
 **/
exports.findAgencies = function(name) {
  return queries.findAgencies(name)
    .then(function(result){
  return new Promise(function(resolve, reject) {
    resolve(result);
    });
  });
}


/**
 * Get program langauges
 *
 * program_id String Filter by program id (optional)
 * returns String
 **/
exports.findLanguages = function(program_id) {
  return queries.findLanguages(program_id)
    .then(function(result){
  return new Promise(function(resolve, reject) {
    resolve(result);
    });
  });
}


/**
 * Get programs
 *
 * agency_id String Filter by agency id (optional)
 * returns String
 **/
exports.findPrograms = function(agency_id, program_id, service_type) {
  return queries.findPrograms(agency_id, program_id, service_type)
    .then(function(result){
  return new Promise(function(resolve, reject) {
    resolve(result);
  });
});
}


/**
 * Get queue
 *
 * returns String
 **/
exports.findQueue = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update agency
 *
 * body AgencyModel Updated agency object
 * no response value expected for this operation
 **/
exports.updateAgency = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update program
 *
 * body ProgramModel Updated program object
 * no response value expected for this operation
 **/
exports.updateProgram = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

