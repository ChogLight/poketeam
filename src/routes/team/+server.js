// @ts-nocheck
import { json } from '@sveltejs/kit';
import db from '$lib/db';
import { ObjectId } from 'mongodb';
export async function GET(event) {
	const teams = await db.collection('pokemon_teams').find({user:event.locals.user.id}).toArray()
	return json(teams)
}

export async function POST({request}) {
	
	const team = await request.json()
	if(team.team_name!= undefined || Object.keys(team).length === 8 ){
		const insert = await db.collection('pokemon_teams').insertOne(team)
		return json({insert})
	}
	else{
		if(team.team_name == undefined ||team.team_name == "") {
			return json({message: "Your team needs a name!!"})
		}
		else{
			return json({message: "Your team needs 6 pokemon!!"})
		}

	}
	
	
}