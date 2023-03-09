// @ts-nocheck
import { json } from '@sveltejs/kit';
import db from '$lib/db';
import { ObjectId } from 'mongodb';
export async function GET() {
	const teams = await db.collection('pokemon_teams').find().toArray()
	return json(teams)
}
