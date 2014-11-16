/*
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

mocha.setup("bdd");
window.assert = chai.assert;

// Override the database id.
window.Whisper          = window.Whisper          || {};
window.Whisper.Database = window.Whisper.Database || {};
Whisper.Database.id = 'test';

/*
 * global helpers for tests
 */
function assertEqualArrayBuffers(ab1, ab2) {
  assert.deepEqual(new Uint8Array(ab1), new Uint8Array(ab2));
};

function arrayBufferToHex(buffer) {
  var array = new Uint8Array(buffer);
  var s = '';
  for (var i in array) {
    var h = array[i].toString(16);
    if (h.length < 2) { s += '0'; }
    s += h;
  }
  return s;
};

function hexToArrayBuffer(str) {
  var ret = new ArrayBuffer(str.length / 2);
  var array = new Uint8Array(ret);
  for (var i = 0; i < str.length/2; i++)
    array[i] = parseInt(str.substr(i*2, 2), 16);
  return ret;
};

function deleteDatabase(done) {
  indexedDB.deleteDatabase('test').then(done);
};

function clearDatabase(done) {
    var convos = new Whisper.ConversationCollection();
    return convos.fetch().then(function() {
        convos.destroyAll().then(function() {
            var messages = new Whisper.MessageCollection();
            return messages.fetch().then(function() {
                messages.destroyAll().then(function() {
                    if (done) {
                      done();
                    }
                });
            });
        });
    });
}
