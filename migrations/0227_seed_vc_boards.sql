-- Seed India & Global Venture Capital fund ATS boards for VC Jobs.
INSERT INTO boards (provider, board, region, company, status, surface, activated_at)
VALUES
    ('greenhouse', 'bessemerventurepartners', '', 'Bessemer Venture Partners', 'active', 'curator', now()),
    ('greenhouse', 'generalcatalyst', '', 'General Catalyst', 'active', 'curator', now()),
    ('greenhouse', 'indexventures', '', 'Index Ventures', 'active', 'curator', now()),
    ('greenhouse', 'primaryventurepartners', '', 'Primary Venture Partners', 'active', 'curator', now()),
    ('greenhouse', 'a16z', '', 'Andreessen Horowitz (a16z)', 'active', 'curator', now()),
    ('greenhouse', 'nea', '', 'New Enterprise Associates (NEA)', 'active', 'curator', now()),
    ('greenhouse', 'greylock', '', 'Greylock Partners', 'active', 'curator', now()),
    ('greenhouse', 'menloventures', '', 'Menlo Ventures', 'active', 'curator', now()),
    ('greenhouse', 'battery', '', 'Battery Ventures', 'active', 'curator', now()),
    ('greenhouse', 'generalatlantic', '', 'General Atlantic', 'active', 'curator', now()),
    ('lever', 'lightspeedvp', '', 'Lightspeed Venture Partners', 'active', 'curator', now()),
    ('lever', 'insightpartners', '', 'Insight Partners', 'active', 'curator', now()),
    ('lever', 'antler', '', 'Antler India & Global', 'active', 'curator', now()),
    ('ashby', 'firstround', '', 'First Round Capital', 'active', 'curator', now()),
    ('ashby', 'khoslaventures', '', 'Khosla Ventures', 'active', 'curator', now()),
    ('ashby', 'redpoint', '', 'Redpoint Ventures', 'active', 'curator', now()),
    ('ashby', '8vc', '', '8VC', 'active', 'curator', now()),
    ('ashby', 'paradigm', '', 'Paradigm', 'active', 'curator', now()),
    ('ashby', 'creandum', '', 'Creandum', 'active', 'curator', now()),
    ('ashby', 'northzone', '', 'Northzone', 'active', 'curator', now()),
    ('ashby', 'speedinvest', '', 'Speedinvest', 'active', 'curator', now()),
    ('workable', 'omnivore', '', 'Omnivore', 'active', 'curator', now()),
    ('workable', 'balderton', '', 'Balderton Capital', 'active', 'curator', now())
ON CONFLICT (provider, lower(board), region) WHERE status IN ('pending', 'active') DO NOTHING;
