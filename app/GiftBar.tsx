
export default function GiftBar({ onVote }) {
  return (
    <div className="flex justify-around bg-black p-3 rounded-xl">
      {[1,5,20,100].map(amount => (
        <button 
          key={amount}
          onClick={() => onVote(amount)}
          className="bg-pink-500 px-4 py-2 rounded-lg text-white"
        >
          ${amount}
        </button>
      ))}
    </div>
  );
}
