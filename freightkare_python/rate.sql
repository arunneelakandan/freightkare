SELECT p.port_name as origin, p1.port_name as destination, ct.container_type, cs.container_size, currency, rate, r.id
	FROM public.tbl_rate_sheet AS r
	left join public.tbl_ports AS p on p.id = r.origin
	left join public.tbl_ports AS p1 on p1.id = r.destination
	left join public.tbl_container_size AS cs on cs.id = r.container_size
	left join public.tbl_container_type AS ct on ct.id = r.container_type
	;


=" ("&E10&", "&G10&", 5, 2, 'INR', "&S10&"),"
INSERT INTO public.tbl_rate_sheet(origin, destination, container_type, container_size, currency, rate) VALUES
    (1467, 708, 5, 2, 'INR', 170),
 (1467, 574, 5, 2, 'INR', 170),
 (1467, 752, 5, 2, 'INR', 170),
 (1467, 4292, 5, 2, 'INR', 170),
 (1467, 4292, 5, 2, 'INR', 170),
 (1467, 1973, 5, 2, 'INR', 170),
 (1467, 1973, 5, 2, 'INR', 170),
 (1467, 1973, 5, 2, 'INR', 170),
 (1467, 953, 5, 2, 'INR', 170),
 (1467, 953, 5, 2, 'INR', 170),
 (1467, 953, 5, 2, 'INR', 170),
 (1467, 2032, 5, 2, 'INR', 170),
 (1467, 2032, 5, 2, 'INR', 170),
 (1467, 2032, 5, 2, 'INR', 170),
 (1467, 1994, 5, 2, 'INR', 170),
 (1467, 1994, 5, 2, 'INR', 170),
 (1467, 2052, 5, 2, 'INR', 170),
 (1467, 2052, 5, 2, 'INR', 170),
 (1467, 2051, 5, 2, 'INR', 170),
 (1467, 4271, 5, 2, 'INR', 170),
 (1467, 4271, 5, 2, 'INR', 170),
 (1467, 4271, 5, 2, 'INR', 170),
 (1467, 4293, 5, 2, 'INR', 170),
 (1467, 1260, 5, 2, 'INR', 170),
 (1467, 188, 5, 2, 'INR', 170),
 (1467, 3383, 5, 2, 'INR', 170),
 (1467, 2648, 5, 2, 'INR', 170),
 (1467, 2648, 5, 2, 'INR', 170),
 (1467, 2648, 5, 2, 'INR', 170),
 (1467, 2302, 5, 2, 'INR', 170),
 (1467, 930, 5, 2, 'INR', 170),
 (1467, 912, 5, 2, 'INR', 170),
 (1467, 913, 5, 2, 'INR', 170),
 (1467, 913, 5, 2, 'INR', 170)
