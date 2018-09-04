var pgp = require('pg-promise')();
var connectionString = process.env.DB_STRING;
var db = pgp(connectionString);

module.exports = {
	createAgency,
	findAgencies,
	findPrograms,
	findLanguages
}

function createAgency(agency_data){
	var query_str = `INSERT INTO agencies (id, 
											name,
											description,
											physical_address,
											mailing_address,
											disability,
											phone_number,
											hours)
					VALUES(${agency_data.id},
							'${agency_data.name}',
							'${agency_data.description}',
							'${agency_data.physical_address}',
							'${agency_data.mailing_address}',
							'${agency_data.disability}',
							'${agency_data.phone_number}',
							'${agency_data.hours}'
							);`
	console.log(query_str)
	return db.none(query_str)

}


function findAgencies(agency_name, search_term){
	var query_str = `SELECT * FROM agencies ORDER BY name;`


	if(agency_name){
		query_str = `SELECT * FROM agencies WHERE name = '${agency_name}' ORDER BY name;`
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

function findLanguages(program_id){
	var where_statement = '';


	if(program_id){
		where_statement = `WHERE program_id = '${program_id}'`
	}

	var query_str = `SELECT * FROM languages ${where_statement} ORDER BY language;`
	console.log(query_str)
	return db.many(query_str)

}


function findPrograms(agency_id, program_id, service_type) {
	var where_statement = '';
	if(agency_id){
		where_statement = `WHERE agency_id = '${agency_id}'`
	}

	if(program_id){
		where_statement = `WHERE id = '${program_id}'`
	}

	if(service_type){
		where_statement = `WHERE service_type = '${service_type}'`
	}

	if(agency_id && program_id){
		where_statement = `WHERE agency_id = '${agency_id}' AND 
								 id = '${program_id}'`						 
	}

	if(program_id && service_type){
		where_statement = `WHERE service_type = '${service_type}' AND 
								 id = '${program_id}'` 
	}


	if(service_type && agency_id){
		where_statement = `WHERE service_type = '${service_type}' AND 
								 agency_id = '${agency_id}'`
	}

	if(agency_id && program_id && service_type){
		where_statement = `WHERE agency_id = '${agency_id}' AND 
								 id = '${program_id}' AND 
								 service_type = '${service_type}'`
	}

	var query_str = `SELECT * FROM programs ${where_statement} ORDER BY name;`

	console.log(query_str)
	return db.many(query_str)
}




