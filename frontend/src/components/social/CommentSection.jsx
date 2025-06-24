import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { formatDate } from '../../utils/formatters';
import { useAuth } from '../../hooks/useAuth';

const Comment = ({ comment, onDelete, canDelete }) => {
  return (
    <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300">
            {comment.author?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="ml-3">
            <div className="flex items-center">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">{comment.author || 'Anonymous'}</h4>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-1">{comment.content}</p>
          </div>
        </div>
        
        {canDelete && (
          <button 
            onClick={() => onDelete(comment.id)}
            className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            aria-label="Delete comment"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

const CommentSection = ({ entryId, comments = [], onAddComment, onDeleteComment }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      setIsSubmitting(true);
      await onAddComment(entryId, newComment);
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Comments ({comments.length})
      </h3>
      
      {comments.length > 0 ? (
        <div className="mb-6">
          {comments.map((comment) => (
            <Comment 
              key={comment.id} 
              comment={comment} 
              onDelete={onDeleteComment}
              canDelete={user && (user.id === comment.userId || user.isAdmin)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 mb-6">No comments yet. Be the first to comment!</p>
      )}
      
      {user ? (
        <form onSubmit={handleSubmit} className="mt-4">
          <Input
            type="textarea"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            required
            className="mb-3"
          />
          <Button 
            type="submit" 
            variant="primary" 
            size="sm"
            disabled={!newComment.trim() || isSubmitting}
            isLoading={isSubmitting}
          >
            Post Comment
          </Button>
        </form>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">You need to be logged in to comment.</p>
          <Button to="/login" variant="outline" size="sm">
            Log In
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;