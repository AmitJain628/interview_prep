phase 1 requirement
Source & Format: Where does the central repository live? (e.g., an S3 bucket, a database, a vendor API?). What is the data format? (e.g., plain text, CSV, JSON).
Update Frequency: How often is the list updated? Every hour? Every minute? Real-time streaming?
Size of Data: What is the approximate size of the IP list? (e.g., 10,000 IPs, 1 million IPs, 100 million IPs?). This is critical for choosing the right data store.
Data Structure: Are we blocking individual IPs (e.g., 192.168.1.1) or CIDR blocks (e.g., 192.168.1.0/24)? Supporting CIDR blocks is more powerful but adds complexity.
Primary Goal: Is the main goal to improve customer experience (reducing latency for valid users during an attack) or to enhance security (preventing account takeover, fraud, and abuse)? This prioritization will guide technical trade-offs.

Customer Control: Do customers want a fully managed solutio
Can they enable/disable the feature?

Can they add their own IPs or CIDR blocks to the blocklist? (This expands the CRUD requirement)

Can they override the global list and allow an IP we have blocked? (Allowlists)

Reporting & Visibility: Will customers need to see metrics? (e.g., "How many login attempts did we block last week?"). This might necessitate a logging and analytics pipeline.

Success Metrics: How do we measure the success of this feature post-launch?

Reduction in malicious login attempts?

Improvement in p99 latency for the login service during attack periods?

Customer adoption rate?

Monitoring & Alerting: What are the key metrics to alert on?

Latency: Spike in IP check time.

Errors: Increase in 5xx/4xx responses from the blocklist service.

Data Freshness: Alert if the list hasn't been updated successfully within a expected time window.

Capacity: Cache memory usage, database connection pool saturation.

Logging: What do we need to log for debugging and auditing?

Every block event? (This could be very high volume).

Only changes to the list itself via the CRUD operations?

. Operational & Security Considerations (The "Keeping the Lights On")
Failure Modes:

Fail-Open vs. Fail-Closed: If the IP Blocklist service is completely down, should the login service allow all traffic (fail-open) or deny all traffic (fail-closed)? Fail-open is usually the safer choice to avoid a full outage but has security implications.

What if the central repository is unavailable? Should we continue using the last-known-good list?



Security of the Service:

The service itself becomes a critical attack vector. How do we secure its API endpoints? (Authentication, Rate Limiting).

How do we prevent attackers from poisoning the list through the CRUD operations? (Strong authorization, input validation).

Cost: Have we considered the cost of the proposed solution? (e.g., data transfer costs of pulling the list, cost of running a Redis cluster, compute costs for the microservice).



Latency -> P99 < 10ms.
Availability SLA: The 99.99% SLA


Multi-tenancy: The problem mentions "customers." Does this mean each customer has their own blocklist, or are we providing a single, global blocklist service for all customers to use? The CRUD requirement suggests customers can manage their lists.

Clarified Assumption: Let's assume it's a single global service for the central list, but the architecture should allow for the future addition of per-customer blocklists.


API Definition: We need to define the API endpoints for CRUD:

GET /v1/blocklist?ip={ip} (The critical lookup endpoint)

POST /v1/blocklist (Add an IP/CIDR)

DELETE /v1/blocklist/{id} (Remove an IP/CIDR)

GET /v1/blocklist (List all entries - for admin use only, paginated)

Non-Functional Requirements:

Scale: Estimate the number of Login Requests Per Second (RPS). If the auth service handles 10k RPS, this service must handle at least the same load.

Security: The service itself becomes a critical security asset and must be protected from DDoS and unauthorized access.

Arhitecture

Component: A serverless function (e.g., AWS Lambda) or a scheduled job (e.g., Kubernetes CronJob).
Function: Polls the central repository (e.g., checks an S3 bucket for a new file every 5 minutes). Downloads the new list, validates the IP formats, and pushes the updates to the Primary Datastore.

Why this works: It's decoupled, scalable, and ensures "regularly up-to-date blocklists without manual intervention."

Requirement: Supports efficient writes from the ingestor and serves as the durable store.

Core Logic: Exposes the CRUD API endpoints. For the critical GET /blocklist?ip={ip} lookup:
a. Bloom Filter Check (Optional but recommended): The service instance holds a local Bloom Filter loaded with all blocked IPs. The Bloom filter can quickly tell us "IP is definitely not blocked" or "IP is probably blocked." This pre-check avoids expensive network calls for the vast majority of valid login attempts.

 Cache Lookup: If the Bloom filter indicates a potential block, the service queries the Data Cache.
c. Decision & Response: The cache returns a true/false. The service responds to the login service accordingly.

Updating the Bloom Filter: When the ingestor updates the datastore, it should also trigger a rebuild of the Bloom filter and push it to all service instances.

 For very large lists, a specialized IP lookup data structure like a trie would be better, potentially implemented in the service logic itself.

 The login service, before validating credentials, will make a call to the IP Blocklist Service's lookup endpoint.

To further minimize latency and respect the SLA, the client should use efficient protocols (gRPC for its performance) and implement retries with circuit breakers (e.g., using Hystrix or Resilience4j) to handle temporary Blocklist service failures gracefully. If the Blocklist service is unavailable, the fail-open vs. fail-closed decision is critical (e.g., maybe allow the login attempt but log the error for auditing).


n = 1,000,000 individual IPs

Desired false positive rate p = 0.01 (1%)

Formulas:

Number of bits in filter: m = - (n * ln(p)) / (ln(2))^2

Number of hash functions: k = (m / n) * ln(2)

ln(0.01) = -4.60517

m = - (1,000,000 * -4.60517) / (0.48045) ≈ 4,605,170 / 0.48045 ≈ 9,585,059 bits

In bytes: 9,585,059 / 8 = 1,198,132 bytes ≈ 1.2 MB

k = (9,585,059 / 1,000,000) * 0.693147 ≈ 6.64 ≈ 7 hash functions

10 M => 11 MB
Bloom Filter Sizing:

For example, if the blocklist grows to 10 million individual IPs (which is unlikely, as CIDR blocks are used for ranges), the Bloom filter would require about 11.5 MB of memory per instance (as calculated earlier). For 100 million IPs, it would be about 115 MB. This is still manageable in memory for modern servers.

The number of hash functions (typically 7-10) remains reasonable and does not significantly impact performance.



The Bloom filter is updated hourly when the central repository changes. Here's how we manage updates without downtime:

Update Mechanism:

The Data Ingestor (AWS Lambda) updates the primary datastore (PostgreSQL) and then publishes a message to an SNS topic.

All microservice instances subscribe to this SNS topic via SQS queues (for reliability). When a message is received, each instance triggers an asynchronous update process.

Each instance fetches the latest list of individual IPs and CIDR blocks from PostgreSQL. It then rebuilds its Bloom filter and CIDR range set in memory.

Atomic Swapping: To avoid blocking during updates, each instance maintains two sets of data structures: one active and one passive. The update is done on the passive set. Once the update is complete, the instance atomically swaps the pointers to make the new set active. This ensures no request is served with stale or incomplete data during the update.



rebuild entire
Bloom Filter Characteristics: A Bloom filter is a probabilistic data structure that requires knowledge of all elements to be added during construction. It cannot be efficiently updated incrementally because:

Adding new elements might require resizing the filter or recalculating hash functions, which is complex and computationally expensive.

The false positive rate is based on the total number of elements and the size of the filter. If we add elements incrementally without rebuilding, the false positive rate could increase unpredictably.

1 billion requests per day, which is about 11,574 
single Redis node can handle up to 100,000 OPS

If the blocklist has 1 million individual IPs, the Redis set might use about 100 MB (estimating 100 bytes per IP due to Redis overhead). For 10 million IPs, it would be about 1 GB, which is manageable with modern Redis clusters.


CREATE TABLE customers (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    ip_blocklist_enabled BOOLEAN DEFAULT TRUE, -- Master toggle for the feature
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blocklist_entries (
    id UUID PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    type VARCHAR(4) NOT NULL CHECK (type IN ('ip', 'cidr')),
    value TEXT NOT NULL, -- e.g., '192.168.1.1' or '192.168.1.0/24'
    list_type VARCHAR(10) NOT NULL CHECK (list_type IN ('block', 'allow')), -- Is this an allowlist or blocklist rule?
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(customer_id, value, list_type) -- Prevent duplicate entries per customer
);

Lazy-Loading Cache (Recommended): Use a shared Redis Cache to store the IPs and CIDR blocks for a specific customer.

When a request comes in for customer_id=X, the service first checks if customer:X:allowlist and customer:X:blocklist exist in Redis.

If they don't, it queries the database for that customer's rules, loads them into Redis (as Sets), and sets an expiration (e.g., 1 hour) to avoid stale data.

Subsequent requests for that customer are very fast Redis SISMEMBER calls.

Pros: Efficient use of memory. Only active customers' data is in the cache.

Cons: The first request for a new customer is slower. You must invalidate the cache when a customer updates their list.

Hybrid Approach for "Big" Customers: For your largest customers with very high traffic, you could pre-warm their rules into the cache.

Recommendation: For this service, Fail-Open is the strongly preferred choice. The business impact of a full login outage is far greater than the risk of allowing some malicious traffic through for a short period. This decision must be clearly documented and understood by all stakeholders.

Central Repository Unavailability
What if the source of truth (the S3 bucket or vendor API) for the global blocklist goes down?

Strategy: The system should continue using the last successfully fetched list. The Data Ingestor (Lambda function) should have robust retry logic with exponential backoff.

Alerting: This event must trigger a high-severity alert to the engineering team. The system is still running, but its data is becoming stale.

Metrics: A metric like blocklist_data_freshness_seconds (time since last successful update) should be monitored on a dashboard.

 1 million IPs ≈ 100 MB


 // calclulation
 ln(0.01) = -4.60517

m = - (1,000,000 * -4.60517) / (0.48045) ≈ 4,605,170 / 0.48045 ≈ 9,585,059 bits

In bytes: 9,585,059 / 8 = 1,198,132 bytes ≈ 1.2 MB

k = (9,585,059 / 1,000,000) * 0.693147 ≈ 6.64 ≈ 7 hash functions

Thus, each Bloom filter uses 1.2 MB of memory and 7 hash functions. This is efficient and easily fits in memory.

CIDR Range Set Calculation
For CIDR blocks stored as ranges:

Assume 10,000 CIDR blocks.

Each range requires two 32-bit integers (start and end IP), so 8 bytes per block.

Total memory: 10,000 * 8 = 80,000 bytes ≈ 0.08 MB.

Binary search on 10,000 ranges requires ≈14 comparisons per lookup, which is very fast (microseconds).

1 billion requests per day (approximately 11,574 requests per second) 