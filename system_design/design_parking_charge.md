# Parking Garage System Design

Source: https://www.youtube.com/watch?v=NtMvNh0WFVM

## Summary
A mock Amazon system design interview focusing on designing a reservation and payment system for a parking garage. The interview demonstrates structured approach to system design, covering requirements, API design, database schema, and system architecture.

## Requirements
- Users should be able to reserve a parking spot
- Support different spot sizes: compact, regular, and large
- Implement flat rate pricing based on vehicle size and time
- Handle payments through third-party providers (e.g., Stripe, Square)
- Maintain system consistency to avoid duplicate reservations

## System Interface

### Public Endpoints
- `POST /reserve` - Reserve a parking spot
- `POST /pay` - Handle payments
- `POST /cancel` - Cancel a reservation

### Internal Endpoints
- `GET /available-spots` - Check free spots
- `POST /allocate-spot` - Allocate parking
- `POST /calculate-payment` - Determine charges

## Database Schema (PostgreSQL)
- **Reservations Table**: Reservation details (garage ID, spot ID, time, payment status)
- **Garage Table**: Garage location and pricing details
- **Spots Table**: Parking spots and availability
- **Users Table**: (Optional) User authentication
- **Vehicles Table**: Vehicle details linked to users

## High-Level Architecture
- **Frontend**: Web or mobile application
- **Backend**: Business logic and database connectivity
- **Database**: PostgreSQL with read replicas
- **Load Balancer**: Traffic distribution across replicas
- **Payment Integration**: External service integration

## Scalability Considerations
- Prioritize strong consistency over eventual consistency
- Database sharding based on location (zip code)
- Read replicas for handling read-heavy operations

## Interview Analysis
### Strengths
- Effective requirement clarification
- Well-justified design choices
- Practical and structured system design
- Strong communication and collaborative approach

## Conclusion
This interview serves as an excellent example for candidates preparing for system design interviews at major tech companies. It showcases:
- Logical problem-solving approach
- Clear decision justification
- Effective technical communication