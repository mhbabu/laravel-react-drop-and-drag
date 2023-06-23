
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>@yield('title','Home')</title>
        {!! Html::style('assets/css/styles.css') !!}
    </head>
    <body class="bg-white">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    @if(isset(auth()->user()->id))
                        <div class="container mt-3">
                            <div class="row">
                                <div class="col-md-10 ml-auto">
                                    <div class="dropdown">
                                        <li class="dropdown-toggle text-black" data-bs-toggle="dropdown" aria-expanded="false" style="text-decoration: none; cursor: pointer; list-style: none">
                                        {{ auth()->user()->name }}
                                        </li>
                                        <ul class="dropdown-menu">
                                            <li>
                                                <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                                Logout
                                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                                        @csrf
                                                    </form>
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="{{ url('auth-user/list') }}">
                                                User List
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="{{ route('task-boards') }}">
                                                Home
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endif
                    @yield('content')
                </main>
            </div>

        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js" crossorigin="anonymous"></script>
        {!! Html::script('assets/js/scripts.js') !!}
    </body>
</html>
