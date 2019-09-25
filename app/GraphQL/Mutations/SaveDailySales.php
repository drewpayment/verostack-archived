<?php

namespace App\GraphQL\Mutations;

use App\DailySale;
use App\Exceptions\GraphQLException;
use App\SaleStatus;
use Exception;
use Illuminate\Support\Facades\Auth;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\DB;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class SaveDailySales
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
        $sales = array();

        $user = Auth::user();
        $user->load('sessionUser');

        DB::beginTransaction();
        try {
            foreach($dtos as $d) 
            {
                if (!array_key_exists('client_id', $d)) {
                    $d['client_id'] = $user->sessionUser->session_client;
                }

                if (!array_key_exists('has_geo', $d)) {
                    $d['has_geo'] = true;
                }

                $sales[] = DailySale::create($d);
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollback();

            throw new GraphQLException($e->getMessage(), $e->getTraceAsString(), true, 'SaleDailySales');
        }

        return $sales;
    }
}
