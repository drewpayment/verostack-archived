<?php

namespace App\GraphQL\Mutations;

use Exception;
use App\DncContact;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class NewDncContactList
{
    /**
     * Return a value for the field.
     *
     * @param  null  $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param  mixed[]  $args The arguments that were passed into the field.
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $context Arbitrary data that is shared between all fields of a single query.
     * @param  \GraphQL\Type\Definition\ResolveInfo  $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     * @return mixed
     */
    public function resolve($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $dtos = $args['input'];
        $contacts = array();

        $user = Auth::user();
        $user->load('sessionUser');

        DB::beginTransaction();
        try {
            foreach($dtos as $d)
            {
                if (!array_key_exists('client_id', $d)) {
                    $d['client_id'] = $user->sessionUser->session_client;
                }
                $contacts[] = DncContact::create($d);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
        }

        return $contacts;
    }
}
