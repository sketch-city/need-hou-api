var pgp = require('pg-promise')();
var connectionString = process.env.DB_STRING;
var db = pgp(connectionString);

module.exports = {
	createAgency,
	findAgencies,
	findPrograms
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


function findAgencies(agency_name){
	var where_statement = '';


	if(agency_name){
		where_statement = `WHERE name = '${agency_name}'`
	}

	var query_str = `SELECT * FROM agencies ${where_statement} ORDER BY name;`
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



	var query_str = `SELECT * FROM programs ${where_statement} ORDER BY name;`
	console.log(query_str)

	return db.many(query_str)
}




