<?php
	define("PG_DB"  , "gisdb");
	define("PG_HOST", "localhost");
	define("PG_USER", "postgres");
	define("PG_PSWD", "framm");
	define("PG_PORT", "5432");
	
	$conexion = pg_connect("dbname=".PG_DB." host=".PG_HOST." user=".PG_USER ." password=".PG_PSWD." port=".PG_PORT."");
    
?>