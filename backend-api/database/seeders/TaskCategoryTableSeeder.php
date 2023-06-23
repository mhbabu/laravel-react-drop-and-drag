<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('task_categories')->insert([
            'name' => 'To Do',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('task_categories')->insert([
            'name' => 'In Progress',
            'created_at' =>  now(),
            'updated_at' =>  now(),
        ]);

        DB::table('task_categories')->insert([
            'name' => 'Done',
            'created_at' =>  now(),
            'updated_at' =>  now(),
        ]);
    }
}
