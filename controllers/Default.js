'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');


module.exports.agenciesOPTIONS = function agenciesOPTIONS (req, res, next) {
  Default.agenciesOPTIONS()
    .then(function(response) {
      utils.writeJson(res, response)
    })
}


module.exports.createAgency = function createAgency (req, res, next) {
  var agency_data = req.swagger.params['agency_data'].value;
  Default.createAgency(agency_data)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createLanguages = function createLanguages (req, res, next) {
  var language_data = req.swagger.params['language_data'].value;
  Default.createLanguages(language_data)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createProgram = function createProgram (req, res, next) {
  var program_data = req.swagger.params['program_data'].value;
  Default.createProgram(program_data)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createQueue = function createQueue (req, res, next) {
  var queue_data = req.swagger.params['queue_data'].value;
  Default.createQueue(queue_data)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findAgencies = function findAgencies (req, res, next) {
  var name = req.swagger.params['name'].value;
  Default.findAgencies(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findLanguages = function findLanguages (req, res, next) {
  var program_id = req.swagger.params['program_id'].value;
  Default.findLanguages(program_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findPrograms = function findPrograms (req, res, next) {
  var agency_id = req.swagger.params['agency_id'].value;
  Default.findPrograms(agency_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findQueue = function findQueue (req, res, next) {
  Default.findQueue()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateAgency = function updateAgency (req, res, next) {
  var body = req.swagger.params['body'].value;
  Default.updateAgency(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateProgram = function updateProgram (req, res, next) {
  var body = req.swagger.params['body'].value;
  Default.updateProgram(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
