'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');


module.exports.agenciesOPTIONS = function agenciesOPTIONS (req, res, next) {
  Default.agenciesOPTIONS()
    .then(function(response) {
      utils.writeJson(res, response)
    })
     .catch(function (response) {
      utils.writeJson(res, response);
    });
}


module.exports.programsOPTIONS = function programsOPTIONS (req, res, next) {
  Default.programsOPTIONS()
    .then(function(response) {
      utils.writeJson(res, response)
    })
     .catch(function (response) {
      utils.writeJson(res, response);
    });
}


module.exports.languagesOPTIONS = function languagesOPTIONS (req, res, next) {
  Default.languagesOPTIONS()
    .then(function(response) {
      utils.writeJson(res, response)
    })
     .catch(function (response) {
      utils.writeJson(res, response);
    });
}

module.exports.commentsOPTIONS = function commentsOPTIONS (req, res, next) {
  Default.commentsOPTIONS()
    .then(function(response) {
      utils.writeJson(res, response)
    })
     .catch(function (response) {
      utils.writeJson(res, response);
    });
}


module.exports.reportsOPTIONS = function reportsOPTIONS (req, res, next) {
  Default.reportsOPTIONS()
    .then(function(response) {
      utils.writeJson(res, response)
    })
     .catch(function (response) {
      utils.writeJson(res, response);
    });
}

module.exports.queueOPTIONS = function queueOPTIONS (req, res, next) {
  Default.queueOPTIONS()
    .then(function(response) {
      utils.writeJson(res, response)
    })
     .catch(function (response) {
      utils.writeJson(res, response);
    });
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

module.exports.createComment = function createComment (req, res, next) {
  var comment_data = req.swagger.params['comment_data'].value;
  Default.createComment(comment_data)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.createReport = function createReport (req, res, next) {
  var report_data = req.swagger.params['report_data'].value;
  Default.createReport(report_data)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createLanguage = function createLanguage (req, res, next) {
  var language_data = req.swagger.params['language_data'].value;
  Default.createLanguage(language_data)
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


module.exports.updateQueue = function updateQueue(req, res, next) {
  var queue_data = req.swagger.params['body'].value;
  Default.updateQueue(queue_data)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateLanguage = function updateLanguage(req, res, next) {
  var language_data = req.swagger.params['body'].value;
  Default.updateLanguage(language_data)
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
  console.log('start here')
  var queue_data = req.swagger.params['queue_data'].value;
  console.log(queue_data)
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
  var search_term = req.swagger.params['search_term'].value;
  var agency_id = req.swagger.params['agency_id'].value;
  Default.findAgencies(name, search_term, agency_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.findComments = function findComments (req, res, next) {
  var comment_id = req.swagger.params['comment_id'].value;
  var program_id = req.swagger.params['program_id'].value;
  Default.findComments(comment_id, program_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findReports = function findReports (req, res, next) {
  var report_id = req.swagger.params['report_id'].value;
  Default.findReports(report_id)
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
  var program_id = req.swagger.params['id'].value;
  var service_type = req.swagger.params['service_type'].value
  Default.findPrograms(agency_id, program_id, service_type)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
          error = {
            error: '404',
            message: 'No program data returned'
          }

      utils.writeJson(res, error , 404);
    });
};

module.exports.findQueue = function findQueue (req, res, next) {
var queue_id = req.swagger.params['queue_id'].value
  Default.findQueue(queue_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
          error = {
            error: '404',
            message: 'No queue data returned'
          }

      utils.writeJson(res, error , 404);
    });
};

module.exports.updateAgency = function updateAgency (req, res, next) {
  var agency_data = req.swagger.params['body'].value;
  Default.updateAgency(agency_data)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateProgram = function updateProgram (req, res, next) {
  var program_data = req.swagger.params['body'].value;
  Default.updateProgram(program_data)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};



module.exports.deleteProgram = function deleteProgram (req, res, next) {
  var program_id = req.swagger.params['program_id'].value;
  Default.deleteProgram(program_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteQueue = function deleteQueue (req, res, next) {
  var queue_id = req.swagger.params['queue_id'].value;
  Default.deleteQueue(queue_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

