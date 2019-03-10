--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: shipments_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shipments_data (
    shipment_id integer NOT NULL,
    date date,
    weight numeric(10,0),
    cost numeric,
    new_shipment_id numeric(10,0),
    new_weight numeric(10,0),
    new_cost numeric(10,0),
    total_tls numeric(2,0),
    source_id text,
    destination_id text
);


ALTER TABLE public.shipments_data OWNER TO postgres;

--
-- Name: TABLE shipments_data; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.shipments_data IS 'table name from which the data should be read';


--
-- Name: COLUMN shipments_data.shipment_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.shipments_data.shipment_id IS 'shipment_id
';


--
-- Name: COLUMN shipments_data.date; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.shipments_data.date IS 'date
';


--
-- Name: COLUMN shipments_data.cost; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.shipments_data.cost IS 'cost
';


--
-- Name: COLUMN shipments_data.new_shipment_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.shipments_data.new_shipment_id IS 'new_shipment_id
';


--
-- Data for Name: shipments_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shipments_data (shipment_id, date, weight, cost, new_shipment_id, new_weight, new_cost, total_tls, source_id, destination_id) FROM stdin;
2	2019-01-07	22000	275	2	38000	280	1	a123	z789
3	2019-01-10	16000	280	2	38000	280	1	a123	z789
4	2019-01-12	15000	295	3	15000	295	1	a123	z789
5	2019-01-16	44000	290	4	44000	290	1	a123	z789
6	2019-01-19	22000	275	5	60000	560	2	a123	z789
1	2019-01-01	25000	250	1	2500	250	1	a123	z789
7	2019-01-01	18000	275	5	60000	560	2	a123	z789
8	2019-01-01	20000	285	5	60000	560	2	a123	z789
\.


--
-- PostgreSQL database dump complete
--

