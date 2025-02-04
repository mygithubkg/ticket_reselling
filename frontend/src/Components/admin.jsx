
              <button onClick={() => handleDelete("tickets", ticket.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Events</h2>
        <ul>
          {events.map((event) => (
            <li key={event.id}>{event.name}</li>