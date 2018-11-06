var pgp = require('pg-promise')();
var connectionString = process.env.DB_STRING;
var db = pgp(connectionString);

module.exports = {
	updateAgency,
	updateProgram,
	updateLanguage,
	updateQueue,
	createAgency,
	createProgram,
	createReport,
	createLanguage,
	createQueue,
	createComment,
	findAgencies,
	findPrograms,
	findComments,
	findReports,
	findLanguages,
	findQueue,
	deleteProgram,
	deleteAgency,
	deleteQueue
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}



function deleteProgram(program_id){
	var where_statement = '';

	if(program_id){
		where_statement = `WHERE id = '${program_id}'`
	}

	var query_str = `DELETE FROM programs ${where_statement};`
	console.log(query_str)
	return db.none(query_str)
}


function deleteAgency(agency_id){
	var where_statement = '';

	if(agency_id){
		where_statement = `WHERE id = '${agency_id}'`
	}

	var query_str = `DELETE FROM agencies ${where_statement};`
	console.log(query_str)
	return db.none(query_str)
}

function deleteQueue(queue_id){
	var where_statement = '';

	if(queue_id){
		where_statement = `WHERE id = '${queue_id}'`
	}

	var query_str = `DELETE FROM queue ${where_statement};`
	console.log(query_str)
	return db.none(query_str)
}





function createLanguage(language_data){
	var query_str = `INSERT INTO languages (program_id, language_arr)
				VALUES( '${language_data.program_id}',
						'{${language_data.language_arr.map((data) => `"${data}"`).join(',')}}' );`
	console.log(query_str)
	return db.none(query_str)					
}


function createQueue(queue_data){
	var query_str = `INSERT INTO queue (posted_date, submission_type, submission, id, status)
				VALUES( now(),
						'${queue_data.submission_type}',
						'${JSON.stringify(queue_data.submission)}',
						'${guid()}',
						'${queue_data.status}'
						);`
					
	console.log(query_str)
	return db.none(query_str)					
}


function updateQueue(queue_data){
		var query_str = `UPDATE queue
		SET posted_date = now(),
			status = '${queue_data.status}'
		WHERE id = '${queue_data.id}';`

	console.log(query_str)
	return db.none(query_str)

}



function updateLanguage(language_data){
		var query_str = `UPDATE languages
		SET language_arr = '{${language_data.language_arr.map((data) => `"${data}"`).join(',')}}' 
		WHERE program_id = '${language_data.program_id}';`

	console.log(query_str)
	return db.none(query_str)

}



function createAgency(agency_data){
	var query_str = `INSERT INTO agencies (id, 
											name,
											description,
											physical_address,
											mailing_address,
											disability,
											phone_number,
											hours, 
											website)
					VALUES( '${agency_data.id}',
							'${agency_data.name}',
							'${agency_data.description}',
							'${agency_data.physical_address}',
							'${agency_data.mailing_address}',
							'${agency_data.disability}',
							'${agency_data.phone_number}',
							'${agency_data.hours}',
							'${agency_data.website}'
							);`
	console.log(query_str)
	return db.none(query_str)

}


function createComment(comment_data){
	var query_str = `INSERT INTO comments (id, 
											program_id,
											comment,
											category,
											submission_date)
					VALUES( '${guid()}',
							'${comment_data.program_id}',
							'${comment_data.comment}',
							'${comment_data.category}',
							 now()
							);`
	console.log(query_str)
	return db.none(query_str)

}



function createReport(report_data){
	var query_str = `INSERT INTO comments (id, 
											name,
											org_name,
											time_incident,
											date_incident,
											org_reported,
											issue_desc,
											alternative)
					VALUES( '${guid()}',
							'${report_data.name}',
							'${report_data.org_name}',
							'${report_data.time_incident}',
							'${report_data.date_incident}',
							'${report_data.org_reported}',
							'${report_data.issue_desc}',
							'${report_data.alternative}'

							);`
	console.log(query_str)
	return db.none(query_str)

}





function updateAgency(agency_data){
	var query_str = `UPDATE agencies
		SET name = '${agency_data.name}',
			description = '${agency_data.description}',
			physical_address = '${agency_data.physical_address}',
			mailing_address = '${agency_data.mailing_address}', 
			disability = '${agency_data.disability}',
			phone_number = '${agency_data.phone_number}',
			hours = '${agency_data.hours}',
			website = '${agency_data.website}'
		WHERE id = '${agency_data.id}';`

	console.log(query_str)
	return db.none(query_str)

}


function updateProgram(program_data){
	var query_str = `UPDATE programs
					 SET
							agency_id = '${program_data.agency_id}',
							id = '${program_data.id}',
							name = '${program_data.name}',
							description = '${program_data.description}',
							physical_address = '${program_data.physical_address}',
							ada = '${program_data.ada}',
							application_process = '${program_data.application_process}',
							documents_required = '${program_data.documents_required}',
							fee_structure = '${program_data.fee_structure}',
							service_cost = '${program_data.service_cost}', 
							coverage_area ='${program_data.coverage_area}',
							service_type = '{${program_data.service_type.map((data) => `"${data}"`).join(',')}}',
							last_updated = now()::timestamp,
							alternative_name = '${program_data.alternative_name}',
							website = '${program_data.website}',
							appointment_required = '${program_data.appointment_required}',
							accepting_clients = '${program_data.accepting_clients}',
							holiday_schedule = '${program_data.holiday_schedule}',
							transportation ='${program_data.transportation}',
							service_area = '${program_data.service_area}',
							waitlist_wait = '${program_data.waitlist_wait}',
							next_steps = '${program_data.next_steps}',
							zipcode_eligibility = '{${program_data.zipcode_eligibility.map((data) => `"${data}"`).join(',')}}',
							income_eligibility ='${program_data.income_eligibility}',
							gender_eligibility = '${program_data.gender_eligibility}',
							age_eligibility = '{${program_data.age_eligibility.map((data) => `"${data}"`).join(',')}}',
							other_program_enrollment = '${program_data.other_program_enrollment}',
							other_eligibility = '${program_data.other_eligibility}',
							immigration_status = '{${program_data.immigration_status.map((data) => `"${data}"`).join(',')}}',
							id_accepted_current = '{${program_data.id_accepted_current.map((data) => `"${data}"`).join(',')}}',
							id_accepted_expired = '{${program_data.id_accepted_expired.map((data) => `"${data}"`).join(',')}}',
							id_accepted_notes = '${program_data.id_accepted_notes}',
							proof_address = '${program_data.proof_address}',
							appointment_required_notes = '${program_data.appointment_required_notes}',
							service_available_intake ='${program_data.service_available_intake}',
							service_available_intake_notes ='${program_data.service_available_intake_notes}',
							website_languages = '{${program_data.website_languages.map((data) => `"${data}"`).join(',')}}',
							frontline_languages ='{${program_data.frontline_languages.map((data) => `"${data}"`).join(',')}}',
							interpretation_offered = '{${program_data.interpretation_offered.map((data) => `"${data}"`).join(',')}}',
							crisis_services_offered = '{${program_data.crisis_services_offered.map((data) => `"${data}"`).join(',')}}',
							schedule_notes = '${program_data.schedule_notes}',
							document_languages ='{${program_data.document_languages.map((data) => `"${data}"`).join(',')}}',
							document_assistance ='${program_data.document_assistance}',
							visual_aids_offered = '${program_data.visual_aids_offered}',
							consultation_opportunity = '${program_data.consultation_opportunity}',
							enforcement_request_policy = '${program_data.enforcement_request_policy}', 
							cultural_competency_offered = '${program_data.cultural_competency_offered}',
							schedule = '${JSON.stringify(program_data.schedule)}'
							WHERE id = '${program_data.id}';`


		

	console.log(query_str)
	return db.none(query_str)

}


function createProgram(program_data){
	var query_str = `INSERT INTO programs  (agency_id,
										    id, 
											name,
											description,
											physical_address,
											ada,
											application_process,
											documents_required,
											fee_structure,
											service_cost,
											coverage_area,
											service_type,
											last_updated,
											alternative_name,
											website,
											appointment_required,
											accepting_clients,
											holiday_schedule,
											transportation,
											service_area,
											waitlist_wait,
											next_steps,
											zipcode_eligibility,
											income_eligibility,
											gender_eligibility,
											age_eligibility,
											other_program_enrollment,
											other_eligibility,
											immigration_status,
											id_accepted_current,
											id_accepted_expired,
											id_accepted_notes,
											proof_address,
											appointment_required_notes,
											service_available_intake,
											service_available_intake_notes,
											website_languages,
											frontline_languages,
											interpretation_offered,
											crisis_services_offered,
											schedule_notes,
											document_languages,
											document_assistance,
											visual_aids_offered,
											consultation_opportunity,
											enforcement_request_policy,
											cultural_competency_offered,
											schedule
											)
					VALUES( '${program_data.agency_id}',
							'${program_data.id}',
							'${program_data.name}',
							'${program_data.description}',
							'${program_data.physical_address}',
							'${program_data.ada}',
							'${program_data.application_process}',
							'${program_data.documents_required}',
							'${program_data.fee_structure}', 
							'${program_data.service_cost}',
							'${program_data.coverage_area}',
							'{${program_data.service_type.map((data) => `"${data}"`).join(',')}}',
							 now()::timestamp,
							'${program_data.alternative_name}',
							'${program_data.website}',
							'${program_data.appointment_required}',
							'${program_data.accepting_clients}',
							'${program_data.holiday_schedule}',
							'${program_data.transportation}',
							'${program_data.service_area}',
							'${program_data.waitlist_wait}',
							'${program_data.next_steps}',
							'{${program_data.zipcode_eligibility.map((data) => `"${data}"`).join(',')}}',
							'${program_data.income_eligibility}',
							'${program_data.gender_eligibility}',
							'{${program_data.age_eligibility.map((data) => `"${data}"`).join(',')}}',
							'${program_data.other_program_enrollment}',
							'${program_data.other_eligibility}',
							'{${program_data.immigration_status.map((data) => `"${data}"`).join(',')}}',
							'{${program_data.id_accepted_current.map((data) => `"${data}"`).join(',')}}',
							'{${program_data.id_accepted_expired.map((data) => `"${data}"`).join(',')}}',
							'${program_data.id_accepted_notes}',
							'${program_data.proof_address}',
							'${program_data.appointment_required_notes}',
							'${program_data.service_available_intake}',
							'${program_data.service_available_intake_notes}',
							'{${program_data.website_languages.map((data) => `"${data}"`).join(',')}}',
							'{${program_data.frontline_languages.map((data) => `"${data}"`).join(',')}}',
							'{${program_data.interpretation_offered.map((data) => `"${data}"`).join(',')}}',
							'{${program_data.crisis_services_offered.map((data) => `"${data}"`).join(',')}}',
							'${program_data.schedule_notes}',
							'{${program_data.document_languages.map((data) => `"${data}"`).join(',')}}',
							'${program_data.document_assistance}',
							'${program_data.visual_aids_offered}',
							'${program_data.consultation_opportunity}',
							'${program_data.enforcement_request_policy}', 
							'${program_data.cultural_competency_offered}',
							'${JSON.stringify(program_data.schedule)}'
							);`
	console.log(query_str)
	return db.none(query_str)

}


function findAgencies(agency_name, search_term, agency_id){
	var query_str = `SELECT * FROM agencies ORDER BY name;`


	if(agency_name){
		query_str = `SELECT * FROM agencies WHERE name = '${agency_name}' ORDER BY name;`
	}

	if(agency_id){
		query_str = `SELECT * FROM agencies WHERE id = '${agency_id}' ORDER BY name;`
	}

	if(search_term){
		query_str = `SELECT DISTINCT agencies.id, agencies.name, agencies.description, agencies.physical_address,
							agencies.mailing_address, agencies.disability, agencies.phone_number, agencies.hours FROM agencies
					 INNER JOIN programs 
					 ON agencies.id = programs.agency_id AND
										programs.description LIKE '%${search_term}%'`
	}

	console.log(query_str)
	return db.many(query_str)

}


function findComments(comment_id, program_id){
	query_str = 'SELECT * FROM comments'
	if(comment_id){
		query_str = `SELECT * FROM comments WHERE id = '${comment_id}' ;`
	}

	if(program_id){
		query_str = `SELECT * FROM comments WHERE program_id = '${program_id}';`
	}

	console.log(query_str)
	return db.many(query_str)

}

function findReports(report_id){
	query_str = 'SELECT * FROM reports'
	if(report_id){
		query_str = `SELECT * FROM reports WHERE id = '${report_id}' ;`
	}


	console.log(query_str)
	return db.many(query_str)

}

function findQueue(queue_id){
	query_str = 'SELECT * FROM queue'
	if(queue_id){
		query_str = `SELECT * FROM queue WHERE id = '${queue_id}' ;`
	}


	console.log(query_str)
	return db.many(query_str)

}


function findLanguages(program_id){
	var where_statement = '';


	if(program_id){
		where_statement = `WHERE program_id = '${program_id}'`
	}

	var query_str = `SELECT * FROM languages ${where_statement};`
	console.log(query_str)

	return db.one(query_str)

}


function findPrograms(agency_id, program_id, service_type) {
	var where_statement = '';

	if(agency_id){
		where_statement = `WHERE programs.agency_id = '${agency_id}'`
	}

	if(program_id){
		where_statement = `WHERE programs.id = '${program_id}'`
	}

	if(service_type){
		where_statement = `WHERE array_to_string(service_type, ', ') LIKE '%${service_type}%'`
	}

	if(agency_id && program_id){
		where_statement = `WHERE programs.agency_id = '${agency_id}' AND 
								 programs.id = '${program_id}'`						 
	}

	if(program_id && service_type){
		where_statement = `WHERE array_to_string(service_type, ', ') LIKE '%${service_type}%' AND 
								 programs.id = '${program_id}'` 
	}


	if(service_type && agency_id){
		where_statement = `WHERE array_to_string(service_type, ', ') LIKE '%${service_type}%' AND 
								 programs.agency_id = '${agency_id}'`
	}

	if(agency_id && program_id && service_type){
		where_statement = `WHERE programs.agency_id = '${agency_id}' AND 
								 programs.id = '${program_id}' AND 
								 array_to_string(service_type, ', ') LIKE '%${service_type}%'`
	}

  	var query_str = `SELECT programs.*, agencies.name AS agency_name, languages.language_arr 
  					FROM programs 
  					INNER JOIN agencies ON programs.agency_id = agencies.id 
  					INNER JOIN languages ON programs.id = languages.program_id
  					${where_statement}
					ORDER BY programs.name;`

	console.log(query_str)

	return db.many(query_str)

}




