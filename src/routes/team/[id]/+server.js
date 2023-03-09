// @ts-nocheck
import { json } from '@sveltejs/kit';
import db from '$lib/db';
import { ObjectId } from 'mongodb';

export async function DELETE({params}) {
	const deleted = await db.collection('pokemon_teams').deleteOne({_id: new ObjectId(params.id)})
    return json(deleted)
}