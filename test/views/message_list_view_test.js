/* vim: ts=4:sw=4:expandtab
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function () {
    'use strict';
    describe('MessageListView', function() {
        before(function(done) {
            clearDatabase(function() {
              var convo = new Whisper.ConversationCollection().add({id: 'barfoo'});
              convo.messages().add({
                  body: 'first message',
                  conversationId: convo.id,
                  timestamp: new Date().getTime() - 5000
              }).save().then(function() {
                  convo.messages().add({
                      body: 'second message',
                      conversationId: convo.id
                  }).save().then(done);
              });
            });
        });
        after(clearDatabase);

        it('has older messages first', function(done) {
            var convo = new Whisper.ConversationCollection().add({id: 'barfoo'});
            var view = new Whisper.MessageListView({collection: convo.messages()});
            convo.fetch().then(function() {
                assert.strictEqual(convo.messages().length, 2);
                assert.match(view.render().$el.html(), /first message[\S\s]*second message/);
                done();
            });
        });
    });
})();
