import TinderCard from "react-tinder-card";

export default function SwipeDeck({ users }) {
  return (
    <div className="flex justify-center">
      {users.map((user) => (
        <TinderCard key={user.id}>
          <ContestCard user={user} />
        </TinderCard>
      ))}
    </div>
  );
}
