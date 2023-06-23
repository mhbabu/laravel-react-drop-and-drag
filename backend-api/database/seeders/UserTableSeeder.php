<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([ // id 1= Admin in this purpose
            'name' => 'System Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('123456'),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // General User
        DB::table('users')->insert([
            'name' => 'Mahadi Hassan',
            'email' => 'mahadihassan@gmail.com',
            'password' => bcrypt('123456'),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'name' => 'Babu',
            'email' => 'babu@gmail.com',
            'password' => bcrypt('123456'),
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
